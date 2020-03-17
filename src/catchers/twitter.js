const Twitter = require('twitter');
const req_api = require('../req-api');

var client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});
 
client.stream('statuses/filter', {follow: '2759958727'}, function(stream) {
    stream.on('data', function(event) {
    //   if(event.user.id === 2759958727){
    //       console.log("baru tweeted xd")
    //   }
        //console.log(event)
        let payload = {
            type: "twitter",
            title: event.user.name,
            url: "https://twitter.com/baruyogesh/status/" + event.id,
            content: event.text,
            imageUrl: [],
            createDate: event.created_at
        };

        req_api.addActivity(payload);

    });
   
    stream.on('error', function(error) {
      throw error;
    });
  });