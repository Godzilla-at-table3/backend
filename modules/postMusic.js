const Music = require('../models/Music.js');

const postMusic = async (request, response, next) => {
  console.log(request.body);

  try {
    let savedSong = await Music.create(request.body);
    response.status(201).send(savedSong);
  } catch (error) {
    next(error);
  }
};

// TODO {email: request.user.email}

module.exports = postMusic;
