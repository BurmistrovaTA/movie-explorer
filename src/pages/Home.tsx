import React, { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";
import { useLocalStorage } from "../hooks/useLocalStorage";

const Home: React.FC = () => {
  const [query, setQuery] = useState("matrix");
  const [favorites, setFavorites] = useLocalStorage<string[]>("favorites", []);
  const [showFavorites, setShowFavorites] = useLocalStorage<boolean>(
    "showFavorites",
    false
  );
  const [filterYearFrom, setFilterYearFrom] = useLocalStorage<number | null>(
    "filterYearFrom",
    null
  );
  const [filterYearTo, setFilterYearTo] = useLocalStorage<number | null>(
    "filterYearTo",
    null
  );
  const [sortBy, setSortBy] = useLocalStorage<"year" | "title" | null>(
    "sortBy",
    null
  );
  const [sortOrder, setSortOrder] = useLocalStorage<"asc" | "desc">(
    "sortOrder",
    "desc"
  );
  const [filterGenre, setFilterGenre] = useLocalStorage<string>(
    "filterGenre",
    ""
  );
  const [filterRating, setFilterRating] = useLocalStorage<number | null>(
    "filterRating",
    null
  );

  // Используем хук
  const { movies, loading, error } = useMovies(query);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const displayedMovies = movies
    .filter((movie) =>
      showFavorites ? favorites.includes(movie.imdbID) : true
    )
    .filter((movie) =>
      filterYearFrom ? Number(movie.Year) >= filterYearFrom : true
    )
    .filter((movie) =>
      filterYearTo ? Number(movie.Year) <= filterYearTo : true
    )
    .filter((movie) =>
      !filterGenre ? true : (movie.Genre ?? "").includes(filterGenre)
    )
    .filter((movie) =>
      !filterRating ? true : Number(movie.imdbRating ?? 0) >= filterRating
    );
  
    const sortedMovies = [...displayedMovies];

  if (sortBy === "title") {
    sortedMovies.sort((a, b) => {
      const titleA = a.Title.toLowerCase();
      const titleB = b.Title.toLowerCase();
      return sortOrder === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    });
  }

  if (sortBy === "year") {
    sortedMovies.sort((a, b) => {
      const yearA = Number(a.Year);
      const yearB = Number(b.Year);
      return sortOrder === "asc" ? yearA - yearB : yearB - yearA;
    });
  }

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

      <input
        type="number"
        placeholder="Год от"
        value={filterYearFrom ?? ""}
        onChange={(e) =>
          setFilterYearFrom(e.target.value ? Number(e.target.value) : null)
        }
      ></input>

      <input
        type="number"
        placeholder="Год до"
        value={filterYearTo ?? ""}
        onChange={(e) =>
          setFilterYearTo(e.target.value ? Number(e.target.value) : null)
        }
      ></input>

      <input
        type="number"
        placeholder="Рейтинг от"
        value={filterRating ?? ""}
        onChange={(e) =>
          setFilterRating(e.target.value ? Number(e.target.value) : null)
        }
        min={0}
        max={10}
        step={0.1}
      ></input>

      <div className="sort-controls">
        <select
          value={sortBy ?? ""}
          onChange={(e) =>
            setSortBy(
              e.target.value ? (e.target.value as "title" | "year") : null
            )
          }
        >
          <option value="">Без сортировки</option>
          <option value="title">По названию</option>
          <option value="year">По году</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
        >
          <option value="">Все жанры</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Adventure">Adventure</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
          <option value="Crime">Crime</option>
          <option value="Family">Family</option>
          <option value="Romance">Romance</option>
        </select>
      </div>
      <button onClick={() => setShowFavorites((prev) => !prev)}>
        {showFavorites ? "Показать все" : "Показать избранные"}
      </button>
      <div className="movie-flex">
        {sortedMovies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            imdbID={movie.imdbID}
            title={movie.Title}
            posterUrl={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/200x300"
            }
            year={movie.Year}
            genre={movie.Genre}
            rating={movie.imdbRating}
            isFavorite={favorites.includes(movie.imdbID)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
