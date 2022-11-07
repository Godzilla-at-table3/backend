'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_DB_URL);

// ** MIDDLEWARE
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;


app.use('*', (req,res) => {
  res.status(404).send('Information unavailable.');
});
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));