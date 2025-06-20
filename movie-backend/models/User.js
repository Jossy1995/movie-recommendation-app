// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

   favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie' // assuming you have a Movie model
    }
  ],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  watchlist: {
  type: [Object], // or [Schema.Types.Mixed]
  default: []
},
  profilePicture: {
    type: String,
    default: '' // You can also add a default image URL
  }, 
  // models/User.js
reviews: [
  {
    movieId: Number,
    title: String,
    review: String,
    rating: Number, // 1 to 5
    date: { type: Date, default: Date.now }
  }
]

},

 {
  timestamps: true, // Automatically adds createdAt and updatedAt
}

);

const User = mongoose.model('User', userSchema);

module.exports = User;
