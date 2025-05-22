import React from 'react';
import './EmptyState.css';

/**
 * PUBLIC_INTERFACE
 * EmptyState component for displaying empty data states
 * @param {string} title - The title to display
 * @param {string} message - The message to display
 * @param {JSX.Element} icon - Optional icon component
 * @param {JSX.Element} action - Optional action component
 * @returns {JSX.Element} EmptyState component
 */
const EmptyState = ({ title, message, icon, action }) => {
  return (
    <div className="empty-state">
      {icon && <div className="empty-state-icon">{icon}</div>}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
