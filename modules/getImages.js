const Image = require('../models/Image.js');

async function getImages(request, response, next){
  try{
  let imageUrl= `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_API_KEY}&count=20&orientation=landscape&fit=crop&w=1080&q=80&fit=max`
  let imageData= await axios.get(imageUrl);
  // let groomedData = imageData.data
  let groomedData = imageData.data.filter((image)=> image.description !== null).map(image => new Image(image));
  console.log(groomedData);
  response.status(200).send(groomedData);
} catch (error) {
  next(error);
}
};

module.exports = getImages;