import React, { useEffect, useState } from 'react';

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  const fetchWatchlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to view your watchlist.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/user/watchlist', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      setWatchlist(data);
    } catch (error) {
      console.error('Failed to fetch watchlist:', error);
    }
  };

  const handleRemove = async (movieId) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:5000/api/user/watchlist/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setWatchlist(watchlist.filter(movie => movie.id !== movieId));
    } catch (error) {
      console.error('Failed to remove movie:', error);
    }
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {watchlist.map(movie => (
            <div key={movie.id} style={{ width: '200px' }}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%' }}
              />
              <p><strong>{movie.title}</strong></p>
              <p>{movie.release_date}</p>
             <button
  onClick={() => handleRemove(movie.id)}
  style={{
    padding: '6px 12px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '8px',
    borderRadius: '4px'
  }}
>
  Remove
</button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
