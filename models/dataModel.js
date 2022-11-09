'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
  imageURL: String,
  selectedSong: String,
  email: String
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;