import React from 'react';
import './MovieList.css';
import MovieCard from '../MovieCard/MovieCard';
import { useMovieContext } from '../../context/MovieContext';
import { filterByGenre, filterByDirector, filterByWatchedStatus, filterByYear, sortMovies, searchMovies } from '../../utils/movieUtils';

/**
 * PUBLIC_INTERFACE
 * MovieList component displays a filtered list of movies
 * @param {boolean} isCompact - Whether to show compact version
 * @returns {JSX.Element} MovieList component
 */
const MovieList = ({ isCompact = false }) => {
  const { movies, loading, error, filters } = useMovieContext();

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  // Apply filters and sorting
  let filteredMovies = [...movies];
  
  // Apply search
  filteredMovies = searchMovies(filteredMovies, filters.searchQuery);
  
  // Apply filters
  filteredMovies = filterByGenre(filteredMovies, filters.genre);
  filteredMovies = filterByDirector(filteredMovies, filters.director);
  filteredMovies = filterByWatchedStatus(filteredMovies, filters.watched);
  filteredMovies = filterByYear(filteredMovies, filters.yearFrom, filters.yearTo);
  
  // Apply sorting
  filteredMovies = sortMovies(
    filteredMovies,
    filters.sortBy,
    filters.sortDirection === 'asc'
  );

  if (filteredMovies.length === 0) {
    return <div className="no-results">No movies found matching your criteria.</div>;
  }

  return (
    <div className={isCompact ? "movie-list-grid" : "movie-list"}>
      {filteredMovies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          isCompact={isCompact} 
        />
      ))}
    </div>
  );
};

export default MovieList;
