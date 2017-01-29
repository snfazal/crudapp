var express       = require('express');
var router        = express.Router();
var User          = require('../models/user.js');
var Product       = require('../models/product.js');
var authHelpers   = require('../helpers/auth.js');

//index for products
//rmr to add authorize back into route
router.get('/', function(req, res){
  console.log('index route');
  User.findById(req.params.id)
    .exec(function(err, user){
      if (err) {console.log(err);}
      res.render, {};
    });
});

router.get('/new', function(req, res){
  console.log('hit products/new route');
  res.render('users/new');
})


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
    res.redirect (`/products/${req.params.id}/${req.params.pId}`);
  });
});


//products create
router.post('/products/new', authHelpers.authorize, function(req, res){
  var product = new Product ({
    product: req.body.product,
    uses: req.body.uses,
    routine: req.body.routine,
    favorites: req.body.favorites,
    details: req.body.details,
    Rating: req.body.rating,
    Bought: req.body.bought,
    Refill: req.body.refill
  });
  User.findById(req.session.currentUser._id)
    .exec(function(err, user){
      if (err) {console.log(err);}
      user.products.push(product);
      user.save();
      res.send(user);
    });
});

//products delete
router.delete('/:id/:pId', authHelpers.authorize, function(req, res){
  Products.findByIdAndRemove(req.params.pId)
    .exec(function(err){
      if (err) {console.log(err);}
      res.send('Product has been deleted');
    });
});

//show products
router.get('/:id', authHelpers.authorize, function(req, res){
  Products.findById(req.params.pId)
    .exec(function(err, product){
      if(err) {console.log(err);}
      res.send(product);
    });
});







module.exports = router;
