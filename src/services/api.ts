import { type MovieType } from "../types/types";

export const fetchMovies = async (query: string): Promise<MovieType[]> => {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${query}&apikey=451b56d0`
  );
  const data = (await response.json()) as {
    Response: string;
    Search?: { Title: string; Year: string; Poster: string; imdbID: string }[];
    Error?: string;
  };

  if (data.Response === "True" && data.Search) {
    const moviesWithDetails: MovieType[] = await Promise.all(
      data.Search.map(async (movie) => {
        const detailsResponse = await fetch(
          `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=451b56d0`
        );
        const detailsData = (await detailsResponse.json()) as {
          Genre: string;
          imdbRating: string;
        };

        return {
          ...movie,
          Genre: detailsData.Genre,
          imdbRating: detailsData.imdbRating,
        };
      })
    );
    return moviesWithDetails;
  } else {
    return [];
  }
};
