const express = require('express');
const { login } = require('../controllers/login'); // <- ✅ correct import

const router = express.Router();

router.post('/login', login); // POST /api/auth/login

module.exports = router;
