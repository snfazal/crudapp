var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user.js');
var products = require('../models/product.js');
var authHelpers = require('../helpers/auth.js');

//user get to login page
router.get('/login', function(req, res) {
  res.render('users/login');
})

//user login
router.post('/login', authHelpers.loginUser, function(req, res){
  console.log(req.session.currentUser)
  res.redirect('/users/' + req.session.currentUser._id);
});

//user logout
router.delete('/', function(req, res){
  req.session.destroy(function(){
    res.redirect('../');
  });
});

module.exports = router;
