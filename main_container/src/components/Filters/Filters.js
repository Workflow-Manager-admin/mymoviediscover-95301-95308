import React, { useEffect, useState } from 'react';
import './Filters.css';
import { useMovieContext } from '../../context/MovieContext';
import { getUniqueGenres, getUniqueDirectors } from '../../utils/movieUtils';

/**
 * PUBLIC_INTERFACE
 * Filters component for filtering and sorting movies
 * @returns {JSX.Element} Filters component
 */
const Filters = () => {
  const { movies, setFilters, filters } = useMovieContext();
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Extract unique filters from movies
  const genres = getUniqueGenres(movies);
  const directors = getUniqueDirectors(movies);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  // Local state to track filter values
  const [localFilters, setLocalFilters] = useState({
    genre: filters.genre || '',
    director: filters.director || '',
    watched: filters.watched,
    yearFrom: filters.yearFrom || '',
    yearTo: filters.yearTo || '',
    sortBy: filters.sortBy || 'title',
    sortDirection: filters.sortDirection || 'asc'
  });

  // Update local filters when global filters change
  useEffect(() => {
    setLocalFilters({
      genre: filters.genre || '',
      director: filters.director || '',
      watched: filters.watched,
      yearFrom: filters.yearFrom || '',
      yearTo: filters.yearTo || '',
      sortBy: filters.sortBy || 'title',
      sortDirection: filters.sortDirection || 'asc'
    });
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    let parsedValue = value;
    if (name === 'yearFrom' || name === 'yearTo') {
      parsedValue = value ? parseInt(value) : null;
    } else if (name === 'watched') {
      if (value === 'all') {
        parsedValue = undefined;
      } else {
        parsedValue = value === 'true';
      }
    }
    
    setLocalFilters({
      ...localFilters,
      [name]: parsedValue
    });
  };

  const handleApplyFilters = () => {
    setFilters(localFilters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      genre: '',
      director: '',
      watched: undefined,
      yearFrom: null,
      yearTo: null,
      sortBy: 'title',
      sortDirection: 'asc'
    };
    
    setLocalFilters(resetFilters);
    setFilters(resetFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`filters-container ${isExpanded ? 'expanded' : ''}`}>
      <div className="filters-header" onClick={toggleExpand}>
        <h3>Filters & Sort</h3>
        <span className="expand-icon">{isExpanded ? '▲' : '▼'}</span>
      </div>
      
      {isExpanded && (
        <div className="filters-content">
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="genre">Genre</label>
              <select
                id="genre"
                name="genre"
                value={localFilters.genre}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="director">Director</label>
              <select
                id="director"
                name="director"
                value={localFilters.director}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Directors</option>
                {directors.map(director => (
                  <option key={director} value={director}>{director}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="watched">Status</label>
              <select
                id="watched"
                name="watched"
                value={localFilters.watched === undefined ? 'all' : String(localFilters.watched)}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="all">All Movies</option>
                <option value="true">Watched</option>
                <option value="false">Unwatched</option>
              </select>
            </div>
          </div>
          
          <div className="filters-row">
            <div className="filter-group">
              <label htmlFor="yearFrom">Year From</label>
              <select
                id="yearFrom"
                name="yearFrom"
                value={localFilters.yearFrom || ''}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Any</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="yearTo">Year To</label>
              <select
                id="yearTo"
                name="yearTo"
                value={localFilters.yearTo || ''}
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">Any</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label htmlFor="sortBy">Sort By</label>
              <div className="sort-container">
                <select
                  id="sortBy"
                  name="sortBy"
                  value={localFilters.sortBy}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="title">Title</option>
                  <option value="year">Year</option>
                  <option value="rating">Rating</option>
                  <option value="userRating">Your Rating</option>
                </select>
                
                <select
                  id="sortDirection"
                  name="sortDirection"
                  value={localFilters.sortDirection}
                  onChange={handleFilterChange}
                  className="filter-select direction-select"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="filter-actions">
            <button 
              className="reset-button"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
            <button 
              className="apply-button"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filters;
