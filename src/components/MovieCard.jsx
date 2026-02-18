// Movie poster card with hover details
import React, { useState } from 'react';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="movie-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      tabIndex={0}
    >
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Image'}
        alt={movie.Title}
        className="movie-card__poster"
      />
      {hovered && (
        <div className="movie-card__details">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          {movie.imdbRating && <p>⭐ {movie.imdbRating}</p>}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
