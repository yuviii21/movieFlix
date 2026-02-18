// Hero banner for featured movie
import React from 'react';
import './HeroBanner.css';

const HeroBanner = ({ movie }) => {
  if (!movie) return null;
  return (
    <section className="hero-banner" style={{backgroundImage: `url(${movie.Poster !== 'N/A' ? movie.Poster : ''})`}}>
      <div className="hero-banner__overlay">
        <div className="hero-banner__content">
          <h1>{movie.Title}</h1>
          <p>{movie.Year}</p>
          <button className="hero-banner__btn">Watch Now</button>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
