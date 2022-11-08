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
    let imageUrl= `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}&count=3&orientation=landscape&fit=crop&w=1080&q=80&fit=max`
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

// ***** SPOTIFY *****
const SpotifyWebApi = require('spotify-web-api-node');

let spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: 'http://localhost:3002/callback'
})

app.get('/auth', getSpotifyAuth);

let scopes = ['streaming', 'user-read-email', 'user-read-private'];
let state = generateRandomString(16);

async function getSpotifyAuth(request, response, next) {
    try {
        let authorizeUrl = spotifyApi.createAuthorizeURL(scopes, state);
        console.log(authorizeUrl);
        response.redirect(authorizeUrl);
    } catch(error) {
        console.log("ERROR: Issue during Spotify authorization.")
        next(error)
    }
}

app.get('/callback', getTokens)

async function getTokens(request, response, next) {
  const code = request.query.code;

  spotifyApi.authorizationCodeGrant(code).then(
    function(data) {
      console.log('The token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      console.log('The refresh token is ' + data.body['refresh_token']);
  
      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(data.body['access_token']);
      spotifyApi.setRefreshToken(data.body['refresh_token']);
      response.redirect('/');
    },
    function(err) {
      console.log('Something went wrong!', err);
    })
}

app.get('/getSpotifySong', getSpotifySong);

function getSpotifySong(request, response, next) {
  let searchQuery = request.query.searchQuery;
  spotifyApi.searchTracks(searchQuery).then(
    function(data) {
      console.log(data.body);
      response.status(200).send(data.body);
    },
    function(err) {
      console.log('Something went wrong!', err);
    }
  );
}

// helper function for state;
// taken from Spotify API docs: https://developer.spotify.com/documentation/web-playback-sdk/guide/#authorization
function generateRandomString(length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// ***** SPOTIFY END *****

app.use('*', (req,res) => {
  res.status(404).send('Error 404, information unavailable');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));