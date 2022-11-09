const Music = require('../models/Music.js');

const deleteMusic = async (request, response, next) => {
  let musicID = request.params.id;
  try{
    await Music.findByIdAndDelete(musicID);
    response.status(200).send('Music Deleted');
  } catch (error){
    response.status(404).send('Deletion Failed');
    next (error);
  }
};

module.exports = deleteMusic;