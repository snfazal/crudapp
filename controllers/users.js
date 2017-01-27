var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

//signup route
router.get('/signup', function(req, res){
  res.render('users/signup');
});

//create route --> redirects to login page after user signs up
router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User ({
    email: req.body.email,
    password_digest: res.hashPassword
  });

  user.save(function(err, user){
    if (err) { console.log(err); }
    res.redirect('/sessions/login');
  });
});

//edit route --> user can edit details
route.get('/:pId/edit', function(req, res){
  res.render('users/show.hbs');
});

//create route
route.post('/', function(req, res){
  res.send('****');
});

module.exports = router;
