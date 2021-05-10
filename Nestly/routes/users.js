var express = require('express');
var router = express.Router();
var models = require('../models'); //<--- Add models
var authService = require('../services/auth'); //<--- Add authentication service

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Create new user if one doesn't exist
router.post('/signup', function (req, res, next) {
  console.log(req.body);
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Address: req.body.Address,
        CommunityName: req.body.CommunityName,
        Password: authService.hashPassword(req.body.password)
      }
    })
    .spread(function (result, created) {
      if (created) {
        res.send('User successfully created');
      } else {
        res.send('This user already exists');
      }
    });
});

// Login user 
router.post('/login', function (req, res, next) {
  models.users.findOne({
    where: {
      Username: req.body.username
    }
  }).then(user => {
    if (!user) {
      console.log('User not found')
      return res.status(401).json({
        message: "Login Failed"
      });
    } else {
     let userLog =  authService.signUser(user)
     res.send(JSON.stringify(userLog));
    }
  });
});

router.get('/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) });
  res.send('Logged out');
});

module.exports = router;