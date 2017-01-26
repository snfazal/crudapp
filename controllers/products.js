var express       = require('express');
var router        = express.Router();
var User          = require('..models/users.js');
var Product       = require('..models/users.js');
var authHelpers   = require('../helpers/auth.js');



//Product update SHOW route
router.get('/:id/edit/:pId', authHelpers.authorize, function(req, res){
  Brew.findById(req.params.pId)
  .exec(function(err, brew){
    if (err) {console.log(err);}
    res.send(brew);
  });
});
