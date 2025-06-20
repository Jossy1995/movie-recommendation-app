const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

const {
  getUserProfile,
  addFavorite,
  getFavorites,
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist
} = require('../controllers/userController');

// Get user profile
router.get('/profile', verifyToken, getUserProfile);

// Favorites
router.post('/favorites', verifyToken, addFavorite);
router.get('/favorites', verifyToken, getFavorites);

// Watchlist
router.post('/watchlist', verifyToken, addToWatchlist);
router.get('/watchlist', verifyToken, getWatchlist);
router.delete('/watchlist/:movieId', verifyToken, removeFromWatchlist);

module.exports = router;