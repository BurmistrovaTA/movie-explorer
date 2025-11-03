import React from "react";

interface MovieCardProps {
  title: string;
  posterUrl: string;
  year: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, posterUrl, year }) => {
  return (
    <div className="movie-card">
      <img src={posterUrl} alt={title} />
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
};

export default MovieCard;