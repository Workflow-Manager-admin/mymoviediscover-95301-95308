import React, { useState } from 'react';
import './SearchBar.css';
import { useMovieContext } from '../../context/MovieContext';

/**
 * PUBLIC_INTERFACE
 * SearchBar component for filtering movies
 * @returns {JSX.Element} SearchBar component
 */
const SearchBar = () => {
  const { setFilters, filters } = useMovieContext();
  const [searchInput, setSearchInput] = useState(filters.searchQuery || '');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setFilters({ searchQuery: searchInput });
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchInput('');
    setFilters({ searchQuery: '' });
  };

  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search movies by title or description..."
          className="search-input"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        
        <div className="search-buttons">
          <button 
            type="button" 
            className="clear-button"
            onClick={handleClearSearch}
            disabled={!searchInput}
          >
            Clear
          </button>
          <button type="submit" className="search-button">Search</button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
