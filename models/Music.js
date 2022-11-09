'use strict';

const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_DATABASE_URL);

let musicSchema = new mongoose.Schema({
  imgURL: {type: String, required: true},
  timestamp: {type: String, required: true},
  selectedSong: {type: String, required: true},
  email: {type: String, required: false},
  comment: {type: String, required: false},
  rating: {type: String, required: false},
  playlist: {type: String, required: false}
});

const Music = mongoose.model('music', musicSchema);

module.exports = Music;