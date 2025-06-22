const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const signupRoutes = require('./routes/signup_route');
const loginRoutes = require('./routes/login_route');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://joflicks.vercel.app'],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from backend! Your server is running.');
});

// Routes with prefixes
app.use('/api/auth/signup', signupRoutes);
app.use('/api/auth/login', loginRoutes);

app.use('/api/user', userRoutes);
app.use('/api/reviews', reviewRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
