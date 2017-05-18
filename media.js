var bot = require('./twit')
var request = require('request');
var fs = require('fs');

var bot = new Twit({
  consumer_key: process.env.TWITTERBOT_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERBOT_CONSUMER_SECRET,
  access_token: process.env.TWITTERBOT_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTERBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60000
});

//get the photo from NASA
function getPhoto(){
  var param = {
    url: 'https://api.nasa.gov/planetary/apod',
    qs: {
      api_key: process.env.NASA_KEY
    },
    encoding: 'binary'
  };
  request.get(param, function(err, response, body){
    body = JSON.parse(body);
    saveFile(body, 'nasa.jpg');
  });
}

//SAVE PHOTO LOCALLY
function saveFile(body, fileName){
  var file = fs.createWriteStream(fileName);
  request(body).pipe(file).on('close', function(err){
    if(err){
      console.log(err);
    }else{
      console.log('saved');
      // console.log(body);
      var description = body.title;
      uploadMedia(description, fileName);
    }
  });
}


function uploadMedia(description, fileName){
  var filePath = __dirname + '/' + fileName;
  bot.postMediaChunked({file_path: filePath}, function(err, data, response){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      var param = {
        status: description,
        media_ids: data.media_id_string
      };
      postStatus(param);
    }
  });
}

function postStatus(param){
  bot.post('statuses/update', param, 
    function(err, data, response){
    if(err){
      console.log(err);
    }else{
      console.log('posted');
    }
  });
}

getPhoto();