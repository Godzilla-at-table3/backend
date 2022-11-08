'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_DB_URL);

// ** MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.get('/', (request, response)=>{
  response.send('Welcome to PicMySong Server');
});
app.get('/images', getImages);

async function getImages(request, response, error){
    let imageUrl= `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}&count=20&orientation=landscape&fit=crop&w=1080&q=80&fit=max`
    let imageData= await axios.get(imageUrl);
    // let groomedData = imageData.data
    let groomedData = imageData.data.filter((image)=> image.description !== null).map(image => new Image(image));
    console.log(groomedData);
    response.status(200).send(groomedData);
};

class Image{
  constructor(imageObj){
    this.id= imageObj.id;
    this.description= imageObj.description;
    this.url= imageObj.urls.regular;
    this.user= imageObj.user.name;
    this.userPortfolio= imageObj.user.portfolio_url
  }
}

app.use('*', (req,res) => {
  res.status(404).send('Error 404, information unavailable');
});
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));