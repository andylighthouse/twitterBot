var bot = require('./twit')

//get most recent tweets, limited by count
function getTwits(){
  bot.get('statuses/home_timeline', {count: 5}, 
    function(err, data, response){
    if(err){
        console.log(err);
      }else{
        data.forEach(function(tweet){
          console.log(tweet.text)
          console.log(tweet.user.screen_name);
          console.log(tweet.id_str);
          console.log('\n');
      });
    }
  });
}
//===========================================
//stream api
//show all the tweets that are being posted which contains the words after track
var stream = bot.stream('statuses/filter', {track: 'nba, trump'});

stream.on('tweet', function(tweet){
  console.log(tweet.text+'\n');
});

// //===========================================
// //search api
// //q = querry
// bot.get('search/tweets', {q: '#nba', result_type: 'popular', count: 10}, 
//   function(err, data, response){
//   if (err){
//     console.log(err);
//   }else{
//     data.statuses.forEach(function(tweet){
//       console.log(tweet.text);
//       console.log(tweet.user.screen_name);
//       console.log('\n');
//     })
//   }
// })


// //===========================================
// //simple thing you can do with twitter
// //making a tweet, put message in status
// bot.post('statuses/update', {status: 'Hello World, testing!'}, function(err, data, response){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data.text + ' was tweeted');
//   }
// });

// //screen_name: twitter handle
// //check users that are following me
// bot.get('followers/list', {secreen_name: 'sugacity99'}, function(err, data, response){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data);
//   }
// });



// //make bot follow someone
// bot.post('friendships/create', {screen_name: 'TWITTER_HANDLE'}, function(err, data, response){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data);
//   }
// });

// //check users that the bot is following
// bot.get('friends/list', {screen_name: 'sugacity99'}, function(err, data, response){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data);
//   }
// });

// //lookup relationship
// bot.get('friendships/lookup', {screen_name: 'GreenChecked'}, function(err, data, response){
//   if(err){
//     console.log(err);
//   }else{
//     console.log(data);
//   }
// });

//send direct message to follower
// bot.post('direct_messages/new', {screen_name: 'GreenChecked', 
//   text: "hello there!, testing from my bot, u little hippie"}, 
//   function(err, data, response){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data);
//     }
// });


// //retweet
// //unretweet
// //the id of the retweet
// bot.post('statuses/retweet/:id', {id: '862732821219115008'},
//   function(err, data, response){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data.text+ 'was retweeted!');
//     }
// });

// //like a tweet
// //'favorites/destroy' to unlike
// bot.post('favorites/create', {id: '862732821219115008'},
//   function(err, data, response){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data.text+ 'was liked!');
//     }
// });

// //replay to tweet
// bot.post('statuses/update', {status: '@TWITTER_HANDLE MESSAGE', in_reply_to_status_id: '862732821219115008'},
//   function(err, data, response){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data);
//     }
// });

// //delete a post
// bot.post('statuses/destroy/:id', {id: '862732821219115008'},
//   function(err, data, response){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data.text+ 'was deleted!');
//     }
// });


