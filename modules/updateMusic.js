const Music = require('../models/Music');

const updateMusic = async (request, response, next) => {

  try {
    let id = request.params.id;
    let updatedMusic = await Music.findByIdAndUpdate(id, request.body, {new: true, overwrite: true});
    response.send(updatedMusic);
  } catch (error) {
    next (error);
  }

};

module.exports = updateMusic;