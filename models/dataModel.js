'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const dataSchema = new Schema({
  email: String
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;