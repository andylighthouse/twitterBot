//setup
var Twit = require('twit');

var bot = new Twit({
consumer_key: process.env.TWITTERBOT_CONSUMER_KEY,
consumer_secret: process.env.TWITTERBOT_CONSUMER_SECRET,
access_token: process.env.TWITTERBOT_ACCESS_TOKEN,
access_token_secret: process.env.TWITTERBOT_ACCESS_TOKEN_SECRET,
timeout_ms: 60000
}); 

module.exports = bot;




