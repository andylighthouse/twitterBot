var bot = require('./twit')
var fs = require('fs')
var request = require('request')
//access to google cloud vision api
var vision = require('@google-cloud/vision')({
  projectId: 'plenary-anvil-110102',
  keyFilename:'./keyfile.json'
});

function downloadPhoto(url, replyName, tweetId){
  var parameters = {
    url: url,
    encoding: 'binary'
  }
  request.get(parameters, function(err, response, body){
    var filename = 'photo' + Date.now() + '.jpg'
    fs.writeFile(filename, body, 'binary', function(err){
      console.log('Downloaded photo.')
      analyzePhoto(filename, replyName, tweetId)
    })
  })
}

function analyzePhoto(filename, replyName, tweetId){
  vision.detectFaces(filename, function(err, faces){
    if (err) {
      console.log(err);
    }else{
      var allEmotions = [];
      //some pictures might have more than one face
      faces.forEach(function(face){
        checkFaceEmotions(face).forEach(function(emotion){
          //use -1 to check if it is in the array
          if (allEmotions.indexOf(emotion) === -1){
            allEmotions.push(emotion)
          }
        })
      })
    }
    postStatus(allEmotions, replyName, tweetId)
  })
}

function postStatus(allEmotions, replyName, tweetId){
  var status = makeStatus(allEmotions, replyName)
    bot.post('statuses/update', {status: status, in_reply_to_status_id: tweetId}, 
      function(err, data, response){
        if(err){
          console.log(err)
        }else{
          console.log('bot tweeted' + status)
        }
    })
}

function makeStatus(allEmotions, replyName){
  var emotionList = {
    joy: 'happy',
    anger: 'angry',
    surprise: 'surprised',
    sorrow: 'sad',
  }
  var status = '@' + replyName + ' Looking '
  if(allEmotions.length>0){
    allEmotions.forEach(function(emotion, i){
      if(i === 0){
        status = status + emotionList[emotion]
      }else{
        status = status + ' and ' + emotionList[emotion]
      }
    })
    status = status + '!'
  }else{
    status = status + 'and found nothing, Google clould api failed to find an emotion, please post another face'
  }
  return status
}

function checkFaceEmotions(face){
  var emotions = ['joy','anger','sorrow','surprise']
  return emotions.filter(function(emotion){
    return face[emotion]
  })
}

var stream = bot.stream('statuses/filter', {track: '@my_photo_Bot'})

stream.on('connected', function(){
  console.log('connected!')
})

stream.on('connecting', function(){
  console.log('connecting...')
})

stream.on('error', function(err){
  console.log(err)
})

//when receiving a tweet, check if their is an image
stream.on('tweet', function(tweet){
  if(tweet.entities.media){
    downloadPhoto(tweet.entities.media[0].media_url, tweet.user.screen_name, tweet.id_str)
  }
})