import React from "react";
import MovieCard from "./components/MovieCard";
import "./index.css";

// Типизация фильма
interface MovieType {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
}

const App: React.FC = () => {
  // Состояния
  const [movies, setMovies] = React.useState<MovieType[]>([]); // список фильмов
  const [loading, setLoading] = React.useState<boolean>(false); // загрузка
  const [error, setError] = React.useState<string | null>(null); // ошибки
  const [query, setQuery] = React.useState("matrix");
  // useEffect для загрузки данных
  React.useEffect(() => {
    if (!query) return;
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?s=${query}&apikey=451b56d0`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovies(data.Search);
          setError(null);
        } else {
          setMovies([]);
          setError(data.Error);
        }
      } catch {
        setError("Ошибка при загрузке данных");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="container">
      <h1>Movie Explorer</h1>

      {loading && <p>Загрузка...</p>}
      {error && <p>{error}</p>}
      <div className="query">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название фильма"
        />
      </div>
      <div className="movie-flex">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            posterUrl={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/200x300"
            }
            year={movie.Year}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
