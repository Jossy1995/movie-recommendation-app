const User = require('../models/User');

// Get user profile (excluding password)
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a movie to favorites
const addFavorite = async (req, res) => {
  const userId = req.user.userId;
  const movie = req.body;

  try {
    const user = await User.findById(userId);
    const alreadyExists = user.favorites.some((fav) => fav.id === movie.id);
    if (!alreadyExists) {
      user.favorites.push(movie);
      await user.save();
      return res.status(200).json({ message: 'Movie added to favorites' });
    }
    return res.status(200).json({ message: 'Movie already in favorites' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get favorites
const getFavorites = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user.favorites);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

// Add to watchlist
const addToWatchlist = async (req, res) => {
  const userId = req.user.userId;
  const movie = req.body;

  try {
    const user = await User.findById(userId);
    const alreadyExists = user.watchlist.some((item) => item.id === movie.id);
    if (!alreadyExists) {
      user.watchlist.push(movie);
      await user.save();
      return res.status(200).json({ message: 'Movie added to watchlist' });
    }
    return res.status(200).json({ message: 'Movie already in watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get watchlist
const getWatchlist = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);
    res.status(200).json(user.watchlist);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch watchlist' });
  }
};

// Remove from watchlist
const removeFromWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.watchlist = user.watchlist.filter((item) => item.id !== req.params.movieId);
    await user.save();
    res.status(200).json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove from watchlist' });
  }
};

// ✅ Export all functions
module.exports = {
  getUserProfile,
  addFavorite,
  getFavorites,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
};
