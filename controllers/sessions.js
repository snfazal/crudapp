var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

//user get to login page
router.get('/login', function(req, res) {
  res.render('users/login');
})

//user login
router.post('/login', authHelpers.loginUser, function(req, res){
  User.findOne({
    email: req.body.email,
    password_digest: req.body.password
  })
  .exec(function(err, user){
    if (err) {console.log(err);}
    res.redirect('/products/' + req.session.currentUser._id);
  });
});

//user logout
router.delete('/', function(req, res){
  req.session.destroy(function(){
    res.redirect('/');
  });
});

module.exports = router;
