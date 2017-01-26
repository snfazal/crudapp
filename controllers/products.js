var express       = require('express');
var router        = express.Router();
var User          = require('..models/users.js');
var Product       = require('..models/users.js');
var authHelpers   = require('../helpers/auth.js');



//Product update SHOW route
router.get('/:id/edit/:pId', authHelpers.authorize, function(req, res){
  Product.findById(req.params.pId)
  .exec(function(err, product){
    if (err) {console.log(err);}
    res.send(product);
  });
});

//product delete
router.put('/:id/:pId', authHelpers.authorize, function(req, res){
  Product.findByIdAndUpdate(req.params.pId, req.body)
  .exec(function(err, product){
    if (err) {console.log(err);}
    product.save();
    res.redirect{`/products/${req.params.id}/${req.params.pId}`};
  });
});
