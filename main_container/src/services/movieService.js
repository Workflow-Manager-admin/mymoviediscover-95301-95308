/**
 * Movie data service with mock data for MyMovieDiscover application
 */

// Mock movie data
const mockMovies = [
  {
    id: 1,
    title: "Inception",
    poster: "https://via.placeholder.com/300x450?text=Inception",
    year: 2010,
    director: "Christopher Nolan",
    genre: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    watched: true,
    userRating: 9
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    poster: "https://via.placeholder.com/300x450?text=Shawshank",
    year: 1994,
    director: "Frank Darabont",
    genre: ["Drama"],
    rating: 9.3,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    watched: true,
    userRating: 10
  },
  {
    id: 3,
    title: "The Dark Knight",
    poster: "https://via.placeholder.com/300x450?text=Dark+Knight",
    year: 2008,
    director: "Christopher Nolan",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    watched: false,
    userRating: null
  },
  {
    id: 4,
    title: "Pulp Fiction",
    poster: "https://via.placeholder.com/300x450?text=Pulp+Fiction",
    year: 1994,
    director: "Quentin Tarantino",
    genre: ["Crime", "Drama"],
    rating: 8.9,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    watched: true,
    userRating: 8
  },
  {
    id: 5,
    title: "The Godfather",
    poster: "https://via.placeholder.com/300x450?text=The+Godfather",
    year: 1972,
    director: "Francis Ford Coppola",
    genre: ["Crime", "Drama"],
    rating: 9.2,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    watched: false,
    userRating: null
  },
  {
    id: 6,
    title: "Interstellar",
    poster: "https://via.placeholder.com/300x450?text=Interstellar",
    year: 2014,
    director: "Christopher Nolan",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    rating: 8.6,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    watched: false,
    userRating: null
  },
];

// Mock user preferences
const mockUserPreferences = {
  favoriteGenres: ["Sci-Fi", "Action", "Drama"],
  favoriteDirectors: ["Christopher Nolan"],
  watchLater: [5, 6], // Array of movie IDs
};

/**
 * PUBLIC_INTERFACE
 * Get all available movies
 * @returns {Promise} Promise resolving to array of movie objects
 */
export const getAllMovies = () => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockMovies);
    }, 500);
  });
};

/**
 * PUBLIC_INTERFACE
 * Get movie details by ID
 * @param {number} id - The movie ID
 * @returns {Promise} Promise resolving to movie object
 */
export const getMovieById = (id) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const movie = mockMovies.find(movie => movie.id === parseInt(id));
      if (movie) {
        resolve(movie);
      } else {
        reject(new Error("Movie not found"));
      }
    }, 300);
  });
};

/**
 * PUBLIC_INTERFACE
 * Get user preferences
 * @returns {Promise} Promise resolving to user preferences object
 */
export const getUserPreferences = () => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockUserPreferences);
    }, 300);
  });
};

/**
 * PUBLIC_INTERFACE
 * Update user preferences
 * @param {Object} preferences - Updated user preferences
 * @returns {Promise} Promise resolving to updated user preferences
 */
export const updateUserPreferences = (preferences) => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      Object.assign(mockUserPreferences, preferences);
      resolve(mockUserPreferences);
    }, 300);
  });
};

/**
 * PUBLIC_INTERFACE
 * Update user movie rating
 * @param {number} movieId - The movie ID
 * @param {number} rating - User rating (1-10)
 * @returns {Promise} Promise resolving to updated movie
 */
export const rateMovie = (movieId, rating) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const index = mockMovies.findIndex(movie => movie.id === parseInt(movieId));
      if (index !== -1) {
        mockMovies[index] = {
          ...mockMovies[index],
          userRating: rating,
          watched: true
        };
        resolve(mockMovies[index]);
      } else {
        reject(new Error("Movie not found"));
      }
    }, 300);
  });
};

/**
 * PUBLIC_INTERFACE
 * Mark movie as watched or unwatched
 * @param {number} movieId - The movie ID
 * @param {boolean} watched - Watched status
 * @returns {Promise} Promise resolving to updated movie
 */
export const setWatchedStatus = (movieId, watched) => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      const index = mockMovies.findIndex(movie => movie.id === parseInt(movieId));
      if (index !== -1) {
        mockMovies[index] = {
          ...mockMovies[index],
          watched
        };
        resolve(mockMovies[index]);
      } else {
        reject(new Error("Movie not found"));
      }
    }, 300);
  });
};

/**
 * PUBLIC_INTERFACE
 * Get recommended movies based on user preferences
 * @returns {Promise} Promise resolving to array of recommended movies
 */
export const getRecommendedMovies = () => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      // Simple recommendation algorithm:
      // 1. Filter movies that match user's favorite genres or directors
      // 2. Prioritize unwatched movies
      const recommendations = mockMovies
        .filter(movie => 
          movie.genre.some(g => mockUserPreferences.favoriteGenres.includes(g)) ||
          mockUserPreferences.favoriteDirectors.includes(movie.director)
        )
        .sort((a, b) => {
          // Sort: unwatched first, then by rating
          if (a.watched !== b.watched) return a.watched ? 1 : -1;
          return b.rating - a.rating;
        });
      
      resolve(recommendations);
    }, 600);
  });
};
