import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [reviews, setReviews] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return;

    // Fetch user profile
    fetch('http://localhost:5000/profile', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setUser(data));

    // Fetch favorites
    fetch('http://localhost:5000/favorites', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setFavorites(data));

    // Fetch watchlist
    fetch('http://localhost:5000/watchlist', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setWatchlist(data));

    // Fetch user's reviews
    fetch('http://localhost:5000/my-reviews', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setReviews(data));
  }, [token]);

  if (!token) return <p>Please log in to view your profile.</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <hr />

      <h3>Favorites</h3>
      {favorites.length === 0 ? <p>No favorite movies yet.</p> :
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {favorites.map(movie => (
            <div key={movie.id} style={{ width: '150px' }}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      }

      <hr />

      <h3>Watchlist</h3>
      {watchlist.length === 0 ? <p>Your watchlist is empty.</p> :
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {watchlist.map(movie => (
            <div key={movie.id} style={{ width: '150px' }}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ width: '100%' }} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      }

      <hr />

      <h3>My Reviews</h3>
      {reviews.length === 0 ? <p>You haven't written any reviews.</p> :
        <div>
          {reviews.map((r, index) => (
            <div key={index} style={{ marginBottom: '15px' }}>
              <strong>{r.title}</strong>
              <p>⭐ {r.rating}/5</p>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default Profile;
