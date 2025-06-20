// routes/signup_route.js
const express = require('express');
const router = express.Router();
const { signup } = require('../controllers/signup'); // Make sure this path is correct

router.post('/signup', signup);

module.exports = router;
