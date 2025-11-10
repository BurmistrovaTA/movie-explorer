import React, { useEffect, useState } from "react";
import "../styles/MovieModal.css"
import { type MovieDetails } from "../types/types";
import { type MovieModalProps } from "../types/types";

const API_KEY = "451b56d0";

const MovieModal: React.FC<MovieModalProps> = ({ imdbID, onClose }) => {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Загружаем данные фильма
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Ошибка загрузки данных");
        }
      } catch {
        setError("Ошибка соединения с сервером");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  });

  // Закрытие по Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [imdbID, onClose]);

  // Закрытие при клике на фон
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>

        {loading && <p>Загрузка...</p>}
        {error && <p>{error}</p>}

        {movie && (
          <>
            <h2>
              {movie.Title} ({movie.Year})
            </h2>
            <p className="modal-item">
              <strong>Жанр:</strong> {movie.Genre}
            </p>
            <p className="modal-item">
              <strong>Рейтинг:</strong> {movie.imdbRating}
            </p>
            <p className="modal-item">
              <strong>Описание:</strong> {movie.Plot}
            </p>
            <p className="modal-item">
              <strong>Режиссёр:</strong> {movie.Director}
            </p>
            <p className="modal-item">
              <strong>Актёры:</strong> {movie.Actors}
            </p>
            {movie.Poster && movie.Poster !== "N/A" && (
              <img src={movie.Poster} alt={movie.Title} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
