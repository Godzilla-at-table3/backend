require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

// FROM: https://developer.spotify.com/documentation/web-playback-sdk/guide/#authorization

const spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
const spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const react_app_server = process.env.REACT_APP_SERVER;
const auth_token = Buffer.from(`${spotify_client_id}:${spotify_client_secret}, 'utf-8'`).toString('base64');


var app = express();

let getSpotifyAuth = (req, res) => {
  let scope = "streaming \
               user-read-email \
               user-read-private"

  let state = generateRandomString(16);

  let auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: react_app_server + "/auth/callback",
    state: state
  })

  res.redirect("https://accounts.spotify.com/authorize/?" + auth_query_parameters.toString());
};

// Original Spotify code based on: https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
// Axios code based on: https://ritvikbiswas.medium.com/connecting-to-the-spotify-api-using-node-js-and-axios-client-credentials-flow-c769e2bee818

let getAccessToken = async (req, res) => {
  const code = req.query.code;

  try {
    const data = qs.stringify({ code: code, 
                                redirect_uri: react_app_server + "auth/callback",
                                grant_type: 'client_credentials'
                              });

    let response = await axios.post("https://accounts.spotify.com/api/token", data, { 
      headers: {
        'Authorization': `Basic ${auth_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });


  } catch(error) {
    console.log(error);
  }
}

let generateRandomString = function (length) {
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

app.get('/auth/callback', (req, res) => {
});