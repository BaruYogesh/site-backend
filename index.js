const env = require('dotenv').config()

if(env.error){
    console.log(env.error);
    throw env.error;
}
twitter = require('./src/catchers/twitter');
api = require('./src/rest-api');