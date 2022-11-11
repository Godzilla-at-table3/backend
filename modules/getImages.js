const axios = require('axios');

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

module.exports = getImages;