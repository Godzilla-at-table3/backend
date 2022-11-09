'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.MONGO_DB_URL);

const Data = require('./models/dataModel');

async function seed() {

  await Data.create({
    imageURL: 'image',
    selectedSong: 'song',
    email: 'email'
  });

  console.log('Data created');

  mongoose.disconnect();
}

seed();