var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

router.get('/signup', function(req, res){
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('users/index.hbs', {
                users: users
              })
  });
})

router.post('/', authHelpers.createSecure, function(req, res){
});

module.exports = router;
