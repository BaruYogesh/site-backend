const axios = require('axios');

function addActivity(payload){

    axios.post('http://localhost:4000/data/add/', payload).then((r) => {
        console.log(r.data);
    }, (error) => {
        console.log(error);
    });
}

module.exports = {
    addActivity
}