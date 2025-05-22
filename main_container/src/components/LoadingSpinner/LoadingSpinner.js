import React from 'react';
import './LoadingSpinner.css';

/**
 * PUBLIC_INTERFACE
 * LoadingSpinner component for displaying loading states
 * @param {string} size - Size of the spinner (small, medium, large)
 * @returns {JSX.Element} LoadingSpinner component
 */
const LoadingSpinner = ({ size = 'medium' }) => {
  return (
    <div className={`spinner-container ${size}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
