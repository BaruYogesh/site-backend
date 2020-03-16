const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Userdata = new Schema({
    type: {
        type: String
    },
    title: {
        type: String
    },
    url: {
        type: String
    },
    content: {
        type: String
    },
    imageUrl:{
        type: [String]
    },
    createDate:{
        type: String
    }
});

module.exports = mongoose.model('Userdata', Userdata);