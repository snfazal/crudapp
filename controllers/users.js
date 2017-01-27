var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

//user index route
router.get('/', function(req, res){
  User.find({})
    .exec(function(err, users){
      if (err) {console.log(err);}
      res.render('users/index', { users: users });
    });
});

//signup route
router.get('/signup', function(req, res){
  res.render('users/signup');
});

//edit route --> user can edit details
router.get('/users/edit', function(req, res){
  res.render('users/show');
});

//create route --> redirects to login page after user signs up
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User ({
    email: req.body.email,
    password_digest: res.hashedPassword
  });
  console.log(user);
  user.save(function(err, user){
    if (err) { console.log(err); }
    req.session.currentUser = user;
    console.log(req.session.currentUser)
    res.render('home/home', { user:user });
  });
});



//create route
router.post('/', function(req, res){
  res.send('a user has been created');
});

module.exports = router;
