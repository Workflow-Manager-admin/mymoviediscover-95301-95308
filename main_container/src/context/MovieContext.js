import { createContext, useReducer, useEffect, useContext, useState } from 'react';
import { 
  getAllMovies, 
  getUserPreferences, 
  getRecommendedMovies,
  rateMovie as rateMovieService,
  setWatchedStatus as setWatchedStatusService,
  updateUserPreferences as updateUserPreferencesService
} from '../services/movieService';

// Create context
export const MovieContext = createContext();

// Initial state
const initialState = {
  movies: [],
  recommendations: [],
  userPreferences: {
    favoriteGenres: [],
    favoriteDirectors: [],
    watchLater: []
  },
  loading: false,
  error: null,
  filters: {
    genre: '',
    director: '',
    watched: undefined,
    yearFrom: null,
    yearTo: null,
    searchQuery: '',
    sortBy: 'title',
    sortDirection: 'asc'
  }
};

// Action types
const FETCH_MOVIES_START = 'FETCH_MOVIES_START';
const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
const FETCH_RECOMMENDATIONS_SUCCESS = 'FETCH_RECOMMENDATIONS_SUCCESS';
const FETCH_USER_PREFS_SUCCESS = 'FETCH_USER_PREFS_SUCCESS';
const UPDATE_MOVIE = 'UPDATE_MOVIE';
const SET_FILTERS = 'SET_FILTERS';
const UPDATE_USER_PREFERENCES = 'UPDATE_USER_PREFERENCES';

// Reducer
const movieReducer = (state, action) => {
  switch (action.type) {
    case FETCH_MOVIES_START:
      return { ...state, loading: true, error: null };
    
    case FETCH_MOVIES_SUCCESS:
      return { ...state, movies: action.payload, loading: false };
    
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    
    case FETCH_RECOMMENDATIONS_SUCCESS:
      return { ...state, recommendations: action.payload };
    
    case FETCH_USER_PREFS_SUCCESS:
      return { ...state, userPreferences: action.payload };
    
    case UPDATE_MOVIE:
      return { 
        ...state, 
        movies: state.movies.map(movie => 
          movie.id === action.payload.id ? action.payload : movie
        )
      };
    
    case SET_FILTERS:
      return { ...state, filters: { ...state.filters, ...action.payload } };

    case UPDATE_USER_PREFERENCES:
      return { ...state, userPreferences: action.payload };
      
    default:
      return state;
  }
};

// Provider component
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Fetch movies and user preferences on mount
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: FETCH_MOVIES_START });
      
      try {
        // Fetch movies
        const moviesData = await getAllMovies();
        dispatch({ type: FETCH_MOVIES_SUCCESS, payload: moviesData });
        
        // Fetch user preferences
        const userPrefs = await getUserPreferences();
        dispatch({ type: FETCH_USER_PREFS_SUCCESS, payload: userPrefs });
        
        // Fetch recommendations
        const recommendedMovies = await getRecommendedMovies();
        dispatch({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: recommendedMovies });
      } catch (error) {
        dispatch({ type: FETCH_MOVIES_FAILURE, payload: error.message });
      }
    };
    
    fetchData();
  }, [refreshTrigger]);

  // Rate a movie
  const rateMovie = async (movieId, rating) => {
    try {
      const updatedMovie = await rateMovieService(movieId, rating);
      dispatch({ type: UPDATE_MOVIE, payload: updatedMovie });
      
      // Refresh recommendations after rating
      const recommendedMovies = await getRecommendedMovies();
      dispatch({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: recommendedMovies });
      
      return updatedMovie;
    } catch (error) {
      console.error("Error rating movie:", error);
      throw error;
    }
  };

  // Set movie watched status
  const setWatchedStatus = async (movieId, watched) => {
    try {
      const updatedMovie = await setWatchedStatusService(movieId, watched);
      dispatch({ type: UPDATE_MOVIE, payload: updatedMovie });
      
      // Refresh recommendations
      const recommendedMovies = await getRecommendedMovies();
      dispatch({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: recommendedMovies });
      
      return updatedMovie;
    } catch (error) {
      console.error("Error updating watched status:", error);
      throw error;
    }
  };

  // Update user preferences
  const updateUserPreferences = async (preferences) => {
    try {
      const updatedPreferences = await updateUserPreferencesService(preferences);
      dispatch({ type: UPDATE_USER_PREFERENCES, payload: updatedPreferences });
      
      // Refresh recommendations
      const recommendedMovies = await getRecommendedMovies();
      dispatch({ type: FETCH_RECOMMENDATIONS_SUCCESS, payload: recommendedMovies });
      
      return updatedPreferences;
    } catch (error) {
      console.error("Error updating user preferences:", error);
      throw error;
    }
  };

  // Set filters
  const setFilters = (filters) => {
    dispatch({ type: SET_FILTERS, payload: filters });
  };

  // Refresh data
  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <MovieContext.Provider
      value={{
        ...state,
        rateMovie,
        setWatchedStatus,
        updateUserPreferences,
        setFilters,
        refreshData
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

/**
 * PUBLIC_INTERFACE
 * Custom hook for accessing the movie context
 * @returns {Object} Movie context value
 */
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};
