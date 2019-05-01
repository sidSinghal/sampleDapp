var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

var User = require('./User');

// create a new user
router.post('/', function(req, res) {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    },
    function(err, user) {
        if(err) return res.status(500).send("There was a problem adding the user to the database");
        res.status(200).send(user);
    });
});

// return all the users from the database
router.get('/', function(req, res) {
    User.find({}, function(err, users){
        if(err) return res.status(500).send("There was an error retrieving users from the db");
        res.status(200).send(users);
    });
});

// get a user by id
router.get('/:id', function(req, res) {
    User.findById(req.params.id, function(err, user) {
        if(err) return res.status(500).send("There was a problem retrieving the user");
        if(!user) return res.status(404).send("User not found");
        res.status(200).send(user);
    });
});

// delete a user from the database
router.delete('/:id', function(req,res) {
    User.findByIdAndRemove(req.params.id, function(err, user) {
        if(err) return res.status(500).send("There was a problem deleting the user");
        res.status(200).send("User: "+user.name+" was deleted");
    });
});

// update a user in the database
router.put('/:id', function(req,res) {
    User.findByIdAndUpdate(req.params.id, function(err, user) {
        if(err) return res.status(500).send("There was a problem updating the user");
        res.status(200).send("User: "+user.name+" was updated");
    });
});

module.exports = router;