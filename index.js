var Twit = require('twit');

var bot = new Twit({
  consumer_key: process.env.TWITTERBOT_CONSUMER_KEY,
  consumer_secret: process.env.TWITTERBOT_CONSUMER_SECRET,
  access_token: process.env.TWITTERBOT_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTERBOT_ACCESS_TOKEN_SECRET,
  timeout_ms: 60000
});

//get most recent twits, limited by count
function getTwits(){
  bot.get('statuses/home_timeline', {count: 5}, 
    function(err, data, response){
    if(err){
        console.log(err);
      }else{
        data.forEach(function(twit){
          console.log(twit.text);
          console.log(twit.user.screen_name);
          console.log(twit.id_str);
          console.log('\n');
      })
    }
  })
}

//===========================================
//search API
bot.get('search/tweets', {}, function(err, data, response){
  if (err){
    console.log(err);
  }else{
    
  }
})


//===========================================
//simple thing I can do with twitter
// //making a twit, put message in status
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

// //like a twit
// //'favorites/destroy' to unlike
// bot.post('favorites/create', {id: '862732821219115008'},
//   function(err, data, response){
//     if(err){
//       console.log(err);
//     }else{
//       console.log(data.text+ 'was liked!');
//     }
// });

// //replay to twit
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


