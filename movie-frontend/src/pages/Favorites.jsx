import React, { useEffect, useState } from 'react';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setFavorites(data);
    };

    fetchFavorites();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>My Favorite Movies</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {favorites.map((movie) => (
          <div key={movie.id} style={{ width: '200px' }}>
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              style={{ width: '100%' }}
            />
            <p><strong>{movie.title}</strong></p>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
