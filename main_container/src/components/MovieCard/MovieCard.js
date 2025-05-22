import React from 'react';
import './MovieCard.css';
import { useMovieContext } from '../../context/MovieContext';

/**
 * PUBLIC_INTERFACE
 * MovieCard component displays individual movie information
 * @param {Object} movie - Movie data object
 * @param {boolean} isCompact - Whether to show compact version
 * @returns {JSX.Element} MovieCard component
 */
const MovieCard = ({ movie, isCompact = false }) => {
  const { rateMovie, setWatchedStatus } = useMovieContext();

  const handleRatingChange = (e) => {
    const rating = parseInt(e.target.value);
    if (rating >= 1 && rating <= 10) {
      rateMovie(movie.id, rating);
    }
  };

  const handleWatchedToggle = () => {
    setWatchedStatus(movie.id, !movie.watched);
  };

  if (isCompact) {
    return (
      <div className="movie-card-compact">
        <img 
          src={movie.poster} 
          alt={`${movie.title} poster`} 
          className="movie-poster-compact"
        />
        <div className="movie-info-compact">
          <h3>{movie.title} ({movie.year})</h3>
          <div className="movie-rating">
            <span className="imdb-rating">IMDb: {movie.rating}</span>
            {movie.userRating && <span className="user-rating">Your rating: {movie.userRating}</span>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-card">
      <img 
        src={movie.poster} 
        alt={`${movie.title} poster`} 
        className="movie-poster"
      />
      <div className="movie-info">
        <h2>{movie.title} ({movie.year})</h2>
        <p className="movie-director">Director: {movie.director}</p>
        <div className="movie-genres">
          {movie.genre.map(genre => (
            <span key={genre} className="genre-tag">{genre}</span>
          ))}
        </div>
        <p className="movie-description">{movie.description}</p>
        
        <div className="movie-actions">
          <div className="movie-ratings">
            <div className="rating-item">
              <span>IMDb Rating:</span>
              <strong>{movie.rating}/10</strong>
            </div>
            
            <div className="rating-item">
              <label htmlFor={`user-rating-${movie.id}`}>Your Rating:</label>
              <select 
                id={`user-rating-${movie.id}`}
                value={movie.userRating || ''}
                onChange={handleRatingChange}
                className="rating-select"
              >
                <option value="">Rate</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i+1} value={i+1}>{i+1}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="watch-status">
            <label className="watch-toggle">
              <input 
                type="checkbox"
                checked={movie.watched}
                onChange={handleWatchedToggle}
              />
              <span className="watch-status-label">
                {movie.watched ? 'Watched' : 'Mark as watched'}
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
