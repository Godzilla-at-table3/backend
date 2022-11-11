'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const Music = require('./models/Music.js');

const getMusic = require('./modules/getMusic.js');
const postMusic = require('./modules/postMusic.js');
const deleteMusic = require('./modules/deleteMusic.js');
const updateMusic = require('./modules/updateMusic.js');

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


async function getImages(request, response, error) {
  let imageUrl = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}&count=2&orientation=landscape&fit=crop&w=1080&q=80&fit=max`
  let imageData = await axios.get(imageUrl);
  let groomedData = imageData.data.filter((image) => image.description !== null).map(image =>
    new Image(image)
  );
  groomedData.forEach(imageObj => imageObj.getWords())
  console.log(groomedData);
  response.status(200).send(groomedData);
};

class Image {
  constructor(imageObj) {
    this.id = imageObj.id;
    this.description = imageObj.description;
    this.url = imageObj.urls.regular;
    this.user = imageObj.user.name;
    this.userPortfolio = imageObj.user.portfolio_url;
    this.words = []
  }
  getWords (){
    let descSplit = this.description.split(' ');
    console.log(descSplit);
    for (let i=0; i<descSplit.length;i++){
      if(descSplit[i].length>3){
        this.words.push(descSplit[i])
      }
    }
    console.log(this.words);
  }
}

app.get('*', (request, response) => {
  response.status(404).send(`These aren't the droids you're looking for.`)
});

app.use((error, request, response, next) => {
  response.status(500).send(error);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));