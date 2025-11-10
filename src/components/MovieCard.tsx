import React from "react";
import "../styles/MovieCard.css"
import { type MovieCardProps } from "../types/types";

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  posterUrl,
  year,
  isFavorite,
  onToggleFavorite,
  imdbID,
  genre,
  rating,
  onOpenDetails
}) => {
  return (
    <div className="movie-card">
      <div className="first-column">
      <img src={posterUrl} alt={title} />
      <h3>{title}</h3>
      <p>Год: {year}</p>
      <p>Жанр: {genre}</p>
      <p>Рейтинг IMDb: {rating}</p>
      </div>
      <button onClick={() => onToggleFavorite(imdbID)}>
        {isFavorite ? "⭐ Удалить из избранного" : "☆ В избранное"}
      </button>
      <button onClick={() => onOpenDetails?.(imdbID)}>Подробнее</button>
    </div>
  );
};

export default MovieCard;
