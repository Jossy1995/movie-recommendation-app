import React, { useEffect, useState } from 'react';
import { getPopularMovies } from '../api/tmdb';
import { Link } from 'react-router-dom';
import Login from './LoginPage';
import Signup from './SignupPage';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [showAuth, setShowAuth] = useState(null); // null, 'login', or 'signup'

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to Movie Explorer</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setShowAuth('login')} style={{ marginRight: '10px' }}>
          Login
        </button>
        <button onClick={() => setShowAuth('signup')}>Signup</button>
      </div>

      {showAuth === 'login' && <Login />}
      {showAuth === 'signup' && <Signup />}

      <Link to="/movies">
        <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', margin: '20px' }}>
          Browse Popular Movies
        </button>
      </Link>

      <div style={{ marginTop: '20px' }}>
        <Link to="/favorites">
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>View Favorites</button>
        </Link>
        <Link to="/watchlist">
          <button style={{ padding: '10px 20px', fontSize: '16px', margin: '10px' }}>View Watchlist</button>
        </Link>
        <Link to="/profile">
          <button>Go to Profile</button>
        </Link>
      </div>

      <h2>Popular Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ width: '200px', margin: '1rem' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <h4>{movie.title}</h4>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
