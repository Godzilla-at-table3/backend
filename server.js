'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Music = require('./models/Music.js');

const getMusic = require('./modules/getMusic.js');
const postMusic = require('./modules/postMusic.js');
const deleteMusic = require('./modules/deleteMusic.js');
const updateMusic = require('./modules/updateMusic.js');
const getImages = require('./modules/getImages.js');

const app = express();
app.use(cors());

mongoose.connect(process.env.MONGO_DB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log(`Mongoose is now connected`);
})

const PORT = process.env.PORT || 3001;

app.use(express.json());

// app.use.apply(verifyUser);
app.get('/', (request, response) => {
  response.status(200).send(`Welcome to the jungle baby.`)
});

app.get('/music', getMusic);

app.post('/music', postMusic);

app.delete('/music/:id', deleteMusic);

app.put('/music/:id', updateMusic);

app.get('/images', getImages);

app.get('*', (request, response) => {
  response.status(404).send(`These aren't the droids you're looking for.`)
});

app.use((error, request, response, next) => {
  response.status(500).send(error);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));