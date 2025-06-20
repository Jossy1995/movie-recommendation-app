const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const User = require('../models/User');

// POST: Submit a new review
router.post('/', verifyToken, async (req, res) => {
  const { movieId, title, review, rating } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    user.reviews.push({ movieId, title, review, rating });
    await user.save();
    res.status(200).json({ message: 'Review submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit review' });
  }
});

// GET: All reviews for a specific movie
router.get('/:movieId', async (req, res) => {
  const movieId = parseInt(req.params.movieId);

  try {
    const users = await User.find({ 'reviews.movieId': movieId });
    const reviews = users.flatMap(user =>
      user.reviews
        .filter(review => review.movieId === movieId)
        .map(review => ({
          username: user.username,
          ...review._doc // spread review fields
        }))
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch reviews' });
  }
});

// GET: All reviews by the currently logged-in user
router.get('/my-reviews', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.status(200).json(user.reviews || []);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user reviews' });
  }
});

module.exports = router;
