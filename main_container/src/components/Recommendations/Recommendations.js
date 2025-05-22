import React from 'react';
import './Recommendations.css';
import MovieCard from '../MovieCard/MovieCard';
import { useMovieContext } from '../../context/MovieContext';

/**
 * PUBLIC_INTERFACE
 * Recommendations component displays personalized movie recommendations
 * @returns {JSX.Element} Recommendations component
 */
const Recommendations = () => {
  const { recommendations, loading } = useMovieContext();
  
  if (loading) {
    return <div className="recommendations-loading">Loading recommendations...</div>;
  }

  return (
    <div className="recommendations-container">
      <h2 className="recommendations-title">Recommended For You</h2>
      
      {recommendations.length === 0 ? (
        <div className="no-recommendations">
          <p>No recommendations available yet. Try rating more movies to get personalized suggestions!</p>
        </div>
      ) : (
        <div className="recommendations-grid">
          {recommendations.slice(0, 4).map(movie => (
            <MovieCard key={movie.id} movie={movie} isCompact={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommendations;
