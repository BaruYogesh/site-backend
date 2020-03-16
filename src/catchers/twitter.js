const Twitter = require('twitter');
const req_api = require('../req-api')
 
var client = new Twitter({
  consumer_key: 'ON9R4sHi80lsYPoggT86SIZt8',
  consumer_secret: 'ItOHfVl2XxHKNCGSNNNDeQGLRWza5NCJNiVu9Y6ANDF2d4y07M',
  access_token_key: '2759958727-Tqi0Cf7NmzvWYYmAeag7fEHcXy6Fn1t0oVf1XcO',
  access_token_secret: 'dJR8Ll3awFCV6cnuaB5u8o6LH04aUfsOdWWzsM9QaTWSV'
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