var Twit = require('twit');
var request =require('request');
var fs = require('fs');

var bot = new Twit({
  consumer_key: process.env.TWITTERBOT_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERBOT_CONSUMER_SECRET,
  access_token: process.env.TWITTERBOT_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTERBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60000
});

function getPhoto(){
  var param = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  }
  request.get(param, function(err, response, body){
    body = JSON.parse(body);
    saveFile(body, 'nasa.jpg');
  });
}

function saveFile(){
  
}