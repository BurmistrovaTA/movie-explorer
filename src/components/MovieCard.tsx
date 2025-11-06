import React from "react";
import "./MovieCard.css";

interface MovieCardProps {
  imdbID: string;
  title: string;
  posterUrl: string;
  year: string;
  genre: string;
  rating: string;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterUrl,
  year,
  isFavorite,
  onToggleFavorite,
  imdbID,
  genre,
  rating,
}) => {
  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} />
      <h3>{title}</h3>
      <p>Год: {year}</p>
      <p>Жанр: {genre}</p>
      <p>Рейтинг IMDb: {rating}</p>
      <button onClick={() => onToggleFavorite(imdbID)}>
        {isFavorite ? "⭐ Удалить из избранного" : "☆ В избранное"}
      </button>
    </div>
  );
};

export default MovieCard;
