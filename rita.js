var bot = require('./twit')
var fs = require('fs');
var csvparse = require('csv-parse');
var rita = require('rita');

var filePath = './past_tweets/tweets.csv'
var inputText = "ANY TEXT"

var tweetData = fs.createReadStream(filePath)
  .pipe(csvparse({delimiter: ','}))
  .on('data', function(row){
    inputText = inputText + '' + cleanText(row[5])
  })
  .on('end', function(){
    var markov = new rita.RiMarkov(3)
    markov.loadText(inputText)
    var sentence = markov.generateSentences(1)
    bot.post('statuses/update', {status: sentence}, function(err, data, response){
      if(err){
        console.log(err)
      }else{
        console.log('status tweeted')
      }
    })
  })

function hasNoStopWords(token){
  var stopwords = ['@', 'http', 'RT']
  return stopwords.every(function(stopword){
    return !token.includes(stopword)
  })
}

function cleanText(text){
  //break up the tweet into tokens, but space
  return rita.RiTa.tokenize(text, ' ')
  .filter(hasNoStopWords)
  .join(' ')
  .trim()
}



// //using markov chain
// var markov = new rita.RiMarkov(3)
// //load the sample text
// markov.loadText(inputText)
// var sentences = markov.generateSentences(1)
// console.log(sentences)

// //probability of showing the word
// console.log(markov.getProbability("Trump"))

// //probability of getting the next word after "Trump"
// console.log(markov.getProbabilities("Trump"))
