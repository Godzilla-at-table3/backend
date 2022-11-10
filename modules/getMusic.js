const Music = require('../models/Music.js');

const getMusic = async (request, response, next) => {
  try {
    let searchResult = await Music.find();
    response.status(200).send(searchResult);
  } catch (error) {
    next(error);
  }
};

// {email: request.user.email}

module.exports = getMusic;