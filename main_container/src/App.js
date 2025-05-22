import React from 'react';
import './App.css';
import { MovieProvider } from './context/MovieContext';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import Filters from './components/Filters/Filters';
import Recommendations from './components/Recommendations/Recommendations';
import MovieList from './components/MovieList/MovieList';
import UserPreferences from './components/UserPreferences/UserPreferences';

/**
 * Main App component for MyMovieDiscover
 * @returns {JSX.Element} App component
 */
function App() {
  return (
    <MovieProvider>
      <div className="app">
        <Header />

        <main className="main-content">
          <div className="container">
            <div className="app-intro">
              <div>
                <h1 className="title">MyMovieDiscover</h1>
                <p className="description">
                  Discover new movies based on your preferences, track your watch history, and rate your favorites.
                </p>
              </div>
              <UserPreferences />
            </div>

            <div className="recommendations-section">
              <Recommendations />
            </div>

            <div className="movie-browser">
              <h2 className="section-title">Movie Browser</h2>
              <SearchBar />
              <Filters />
              <MovieList />
            </div>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <p>© {new Date().getFullYear()} MyMovieDiscover | A personalized movie recommendation app</p>
            </div>
          </div>
        </footer>
      </div>
    </MovieProvider>
  );
}

export default App;
