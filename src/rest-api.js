const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dataRoutes = express.Router();
const PORT = 4000;
const ReadWriteLock = require('rwlock');
var lock = new ReadWriteLock();
let userData = require('./models/userdata.model');
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/userdata', { useNewUrlParser: true , useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

dataRoutes.route('/').get(function(req, res) {
    userData.find(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
});

dataRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    userData.findById(id, function(err, data) {
        res.json(data);
    });
});

dataRoutes.route('/update/:id').post(function(req, res) {
    userData.findById(req.params.id, function(err, data) {
        if (!data)
            res.status(404).send("data is not found");
        else{
            
            console.log(req.body);
            // todo.todo_description = req.body.todo_description;
            // todo.todo_responsible = req.body.todo_responsible;
            // todo.todo_priority = req.body.todo_priority;
            // todo.todo_completed = req.body.todo_completed;     
            data.content = req.body.content;
            data.type = req.body.type;
            data.imageUrl = req.body.imageUrl;       

            data.save().then(data => {
                res.json('Data updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
            
    });
});

dataRoutes.route('/add').post(function(req, res) {
    let data = new userData(req.body);
    data.save()
        .then(data => {
            res.status(200).json({'data': 'data added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new data failed');
        });
});

dataRoutes.route('/delete/:id').delete(async function(req, res){
    lock.writeLock(async function(release){
        await userData.findOneAndDelete({_id:req.params.id});
        res.status(200).send();
        release();
    });
    res.json('Data was deleted');
});

app.use('/data', dataRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});