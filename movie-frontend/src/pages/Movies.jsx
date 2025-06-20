import React, { useEffect, useState } from 'react';
import { getPopularMovies, searchMovies, getGenres } from '../api/tmdb';
import {Link} from 'react-router-dom'

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    const data = await getPopularMovies();
    setMovies(data);
  };

  const fetchGenres = async () => {
    const data = await getGenres();
    setGenres(data);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await searchMovies(query);
    setMovies(data);
  };

  const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);

    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&with_genres=${genreId}`);
    const data = await res.json();
    setMovies(data.results);
  };

  
  // Add to favorites function
  const handleAddToFavorites = async (movie) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to favorite movies.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(movie)
      });

      const data = await res.json();
      alert(data.message);
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

// Watchlist function
  const handleAddToWatchlist = async (movie) => {
  const token = localStorage.getItem('token');
  if (!token) return alert('You must be logged in.');

  try {
    const res = await fetch('http://localhost:5000/api/user/watchlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(movie)
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error('Failed to add to watchlist', err);
  }
};

// --- Reviews ---
const [reviewInputs, setReviewInputs] = useState({});

const handleReviewChange = (movieId, field, value) => {
  setReviewInputs(prev => ({
    ...prev,
    [movieId]: {
      ...prev[movieId],
      [field]: value
    }
  }));
};

const submitReview = async (movie) => {
  const token = localStorage.getItem('token');
  if (!token) return alert('Login required to leave a review.');

  try {
    await fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        movieId: movie.id,
        title: movie.title,
        review: reviewInputs[movie.id]?.text || '',
        rating: reviewInputs[movie.id]?.rating || 5
      })
    });
    alert('Review submitted!');
  } catch (error) {
    console.error('Error submitting review:', error);
  }
};

  return (
    <div style={{ padding: '20px' }}>
      <h2>Popular Movies</h2>

      {/* Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: '8px', width: '250px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', marginLeft: '10px' }}>Search</button>
      </form>

      {/* Genre Filter */}
      <select onChange={handleGenreChange} value={selectedGenre} style={{ marginBottom: '20px', padding: '8px' }}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option value={genre.id} key={genre.id}>{genre.name}</option>
        ))}
      </select>

     {/* Movie Grid */}
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
  {movies.map((movie) => (
    <div key={movie.id} style={{ width: '200px' }}>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={movie.title}
        style={{ width: '100%' }}
      />
      <p><strong>{movie.title}</strong></p>
      <p>{movie.release_date}</p>
      <button onClick={() => handleAddToFavorites(movie)}>Add to Favorites</button>
      <button onClick={() => handleAddToWatchlist(movie)}>Add to Watchlist</button>

      {/* --- Rating & Review Form --- */}
      <div style={{ marginTop: '10px' }}>
        <select
          value={reviewInputs[movie.id]?.rating || 5}
          onChange={(e) => handleReviewChange(movie.id, 'rating', e.target.value)}
        >
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num} Star</option>
          ))}
        </select>
        <textarea
          placeholder="Write a review..."
          value={reviewInputs[movie.id]?.text || ''}
          onChange={(e) => handleReviewChange(movie.id, 'text', e.target.value)}
          style={{ width: '100%', marginTop: '5px' }}
        />
        <button onClick={() => submitReview(movie)}>Submit Review</button>
      </div>
    </div>
  ))}
</div>
    </div>
  );

  // Movie Image or Title
  <Link to={`/movies/${movie.id}`}>
  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
</Link>
};

export default Movies;
