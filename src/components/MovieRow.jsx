// Horizontal row of movie cards
import React from 'react';
import MovieCard from './MovieCard';
import './MovieRow.css';

const MovieRow = ({ title, movies }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <section className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row__list">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieRow;
