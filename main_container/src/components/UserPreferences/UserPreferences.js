import React, { useState, useEffect } from 'react';
import './UserPreferences.css';
import { useMovieContext } from '../../context/MovieContext';
import { getUniqueGenres, getUniqueDirectors } from '../../utils/movieUtils';

/**
 * PUBLIC_INTERFACE
 * UserPreferences component for managing user preferences
 * @returns {JSX.Element} UserPreferences component
 */
const UserPreferences = () => {
  const { movies, userPreferences, updateUserPreferences } = useMovieContext();
  const [isOpen, setIsOpen] = useState(false);
  
  // Get all unique genres and directors
  const allGenres = getUniqueGenres(movies);
  const allDirectors = getUniqueDirectors(movies);
  
  // Local state for form
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedDirectors, setSelectedDirectors] = useState([]);
  
  // Update local state when userPreferences change
  useEffect(() => {
    if (userPreferences) {
      setSelectedGenres(userPreferences.favoriteGenres || []);
      setSelectedDirectors(userPreferences.favoriteDirectors || []);
    }
  }, [userPreferences]);

  const handleToggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handleToggleDirector = (director) => {
    if (selectedDirectors.includes(director)) {
      setSelectedDirectors(selectedDirectors.filter(d => d !== director));
    } else {
      setSelectedDirectors([...selectedDirectors, director]);
    }
  };

  const handleSavePreferences = () => {
    updateUserPreferences({
      favoriteGenres: selectedGenres,
      favoriteDirectors: selectedDirectors
    });
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="preferences-button" onClick={toggleModal}>
        <span className="preferences-icon">⚙️</span>
        Your Preferences
      </button>
      
      {isOpen && (
        <div className="preferences-modal-overlay">
          <div className="preferences-modal">
            <div className="preferences-modal-header">
              <h2>Your Movie Preferences</h2>
              <button className="close-button" onClick={toggleModal}>×</button>
            </div>
            
            <div className="preferences-modal-content">
              <div className="preferences-section">
                <h3>Favorite Genres</h3>
                <div className="genres-grid">
                  {allGenres.map(genre => (
                    <div 
                      key={genre}
                      className={`genre-chip ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                      onClick={() => handleToggleGenre(genre)}
                    >
                      {genre}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="preferences-section">
                <h3>Favorite Directors</h3>
                <div className="directors-list">
                  {allDirectors.map(director => (
                    <div 
                      key={director}
                      className={`director-item ${selectedDirectors.includes(director) ? 'selected' : ''}`}
                      onClick={() => handleToggleDirector(director)}
                    >
                      {director}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="preferences-modal-footer">
              <button className="cancel-button" onClick={toggleModal}>Cancel</button>
              <button className="save-button" onClick={handleSavePreferences}>Save Preferences</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPreferences;
