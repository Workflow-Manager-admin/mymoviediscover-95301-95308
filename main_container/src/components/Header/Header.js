import React from 'react';
import './Header.css';
import { useMovieContext } from '../../context/MovieContext';

/**
 * PUBLIC_INTERFACE
 * Header component for the MyMovieDiscover app
 * @returns {JSX.Element} Header component
 */
const Header = () => {
  const { movies } = useMovieContext();
  
  // Calculate stats
  const totalMovies = movies.length;
  const watchedMovies = movies.filter(movie => movie.watched).length;
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo">
            <span className="logo-symbol">🎬</span>
            <span className="logo-text">MyMovieDiscover</span>
          </div>
          <p className="tagline">Discover your next favorite movie</p>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-value">{totalMovies}</span>
            <span className="stat-label">Total Movies</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{watchedMovies}</span>
            <span className="stat-label">Watched</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{Math.round((watchedMovies / totalMovies) * 100) || 0}%</span>
            <span className="stat-label">Completion</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
