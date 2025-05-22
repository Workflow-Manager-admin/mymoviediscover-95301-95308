/**
 * Utility functions for processing movie data
 */

/**
 * PUBLIC_INTERFACE
 * Filter movies by genre
 * @param {Array} movies - Array of movie objects
 * @param {string} genre - Genre to filter by
 * @returns {Array} Filtered movies
 */
export const filterByGenre = (movies, genre) => {
  if (!genre) return movies;
  return movies.filter(movie => movie.genre.includes(genre));
};

/**
 * PUBLIC_INTERFACE
 * Filter movies by director
 * @param {Array} movies - Array of movie objects
 * @param {string} director - Director name
 * @returns {Array} Filtered movies
 */
export const filterByDirector = (movies, director) => {
  if (!director) return movies;
  return movies.filter(movie => movie.director === director);
};

/**
 * PUBLIC_INTERFACE
 * Filter movies by watched status
 * @param {Array} movies - Array of movie objects
 * @param {boolean} watched - Watched status
 * @returns {Array} Filtered movies
 */
export const filterByWatchedStatus = (movies, watched) => {
  if (watched === undefined) return movies;
  return movies.filter(movie => movie.watched === watched);
};

/**
 * PUBLIC_INTERFACE
 * Filter movies by year
 * @param {Array} movies - Array of movie objects
 * @param {number} fromYear - Starting year (inclusive)
 * @param {number} toYear - Ending year (inclusive)
 * @returns {Array} Filtered movies
 */
export const filterByYear = (movies, fromYear, toYear) => {
  if (!fromYear && !toYear) return movies;
  
  return movies.filter(movie => {
    if (fromYear && toYear) {
      return movie.year >= fromYear && movie.year <= toYear;
    } else if (fromYear) {
      return movie.year >= fromYear;
    } else {
      return movie.year <= toYear;
    }
  });
};

/**
 * PUBLIC_INTERFACE
 * Sort movies by specified criterion
 * @param {Array} movies - Array of movie objects
 * @param {string} criterion - Sorting criterion (title, year, rating)
 * @param {boolean} ascending - Sort direction (true for ascending, false for descending)
 * @returns {Array} Sorted movies
 */
export const sortMovies = (movies, criterion, ascending = true) => {
  const sortedMovies = [...movies];
  
  sortedMovies.sort((a, b) => {
    let comparison = 0;
    
    switch (criterion) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'year':
        comparison = a.year - b.year;
        break;
      case 'rating':
        comparison = a.rating - b.rating;
        break;
      case 'userRating':
        // Handle null values
        if (a.userRating === null && b.userRating === null) {
          comparison = 0;
        } else if (a.userRating === null) {
          comparison = 1; // Nulls last when ascending
        } else if (b.userRating === null) {
          comparison = -1; // Nulls last when ascending
        } else {
          comparison = a.userRating - b.userRating;
        }
        break;
      default:
        comparison = 0;
    }
    
    return ascending ? comparison : -comparison;
  });
  
  return sortedMovies;
};

/**
 * PUBLIC_INTERFACE
 * Search movies by title or description
 * @param {Array} movies - Array of movie objects
 * @param {string} query - Search query
 * @returns {Array} Filtered movies
 */
export const searchMovies = (movies, query) => {
  if (!query) return movies;
  
  const searchTerm = query.toLowerCase();
  
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm) ||
    movie.description.toLowerCase().includes(searchTerm)
  );
};

/**
 * PUBLIC_INTERFACE
 * Get all unique genres from movie collection
 * @param {Array} movies - Array of movie objects
 * @returns {Array} Unique genres
 */
export const getUniqueGenres = (movies) => {
  const genresSet = new Set();
  
  movies.forEach(movie => {
    movie.genre.forEach(g => genresSet.add(g));
  });
  
  return Array.from(genresSet).sort();
};

/**
 * PUBLIC_INTERFACE
 * Get all unique directors from movie collection
 * @param {Array} movies - Array of movie objects
 * @returns {Array} Unique directors
 */
export const getUniqueDirectors = (movies) => {
  return [...new Set(movies.map(movie => movie.director))].sort();
};
