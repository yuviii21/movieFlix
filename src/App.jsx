import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import './App.css';
import './AppResponsive.css';

import './components/Navbar.css';
import './components/HeroBanner.css';
import './components/MovieRow.css';
import './components/MovieCard.css';

const API_KEY = '24301e65';
const API_URL = 'https://www.omdbapi.com/';

const ROWS = [
  { title: 'Trending', query: 'batman' },
  { title: 'Popular', query: 'avengers' },
  { title: 'Latest', query: 'spider' },
];

function App() {
  const [rows, setRows] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);

  // Fetch movie rows
  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all(
      ROWS.map(row =>
        fetch(`${API_URL}?apikey=${API_KEY}&s=${row.query}`)
          .then(res => res.json())
          .then(data => data.Search || [])
      )
    )
      .then(results => {
        setRows(results);
        // Pick first movie of first row as featured
        setFeatured(results[0] && results[0][0]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load movies.');
        setLoading(false);
      });
  }, []);

  // Search movies
  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      setSearchError(null);
      setSearchLoading(false);
      return;
    }
    setSearchLoading(true);
    setSearchError(null);
    fetch(`${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(search)}`)
      .then(res => res.json())
      .then(data => {
        if (data.Response === 'True') {
          setSearchResults(data.Search);
        } else {
          setSearchResults([]);
          setSearchError('No results found.');
        }
        setSearchLoading(false);
      })
      .catch(() => {
        setSearchError('Search failed.');
        setSearchLoading(false);
      });
  }, [search]);

  return (
    <div className="app">
      <Navbar onSearch={setSearch} />
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <HeroBanner movie={featured} />
          {search ? (
            <section className="search-results">
              <h2>Search Results</h2>
              {searchLoading ? (
                <div className="loading">Searching...</div>
              ) : searchError ? (
                <div className="error">{searchError}</div>
              ) : (
                <div className="movie-row__list">
                  {searchResults.map(movie => (
                    <React.Fragment key={movie.imdbID}>
                      {/* MovieCard expects imdbRating, fetch details for each movie */}
                      <MovieWithRating movie={movie} />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </section>
          ) : (
            ROWS.map((row, i) => (
              <MovieRow key={row.title} title={row.title} movies={rows[i]} />
            ))
          )}
        </>
      )}
    </div>
  );
}

// Helper to fetch movie details for rating
function MovieWithRating({ movie }) {
  const [details, setDetails] = useState(movie);
  useEffect(() => {
    let ignore = false;
    fetch(`${API_URL}?apikey=${API_KEY}&i=${movie.imdbID}`)
      .then(res => res.json())
      .then(data => {
        if (!ignore && data.Response === 'True') setDetails({ ...movie, imdbRating: data.imdbRating });
      });
    return () => { ignore = true; };
  }, [movie.imdbID]);
  return <MovieRow movies={[details]} title="" />;
}

export default App;
