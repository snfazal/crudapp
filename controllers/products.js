var express       = require('express');
var router        = express.Router();
var User          = require('../models/user.js');
var Product       = require('../models/product.js');
var authHelpers   = require('../helpers/auth.js');

//CREATE route -- adding a new product to store
router.post('/', function(req, res){
  User.findById(req.session.currentUser._id)
    .exec(function(err, user){
      if (err) {console.log(err)}
      user.restaurants.push({
        name: res.body.name,
        productt: req.body.product,
        uses: req.body.uses,
        routine: req.body.routine,
        favorites: req.body.favorites,
        details: req.body.details,
        Rating: req.body.rating,
        Bought: req.body.bought,
        Refill: req.body.refill
      })
      user.save();

      res.redirect("/users/" + req.session.currentUser._id);
    });
});

//ROUTE renders an edit page
router.get('/:id/edit', function(req, res){
  console.log("Testing REQ.Params:", req.params)
  User.findById(req.session.currentUser._id)
  .exec(function(err, user){
    console.log("got new user", user)

  var product = user.products.id(req.params.id);
  console.log("Found a new product:", product)
  res.render('products/edit', {
    user: user,
    product: products
    });
  });
});

//Update ROUTE saves changes when editing products
router.put('/:id', function(req, res){
  //on click submit from edit.hbs will redirect to
  console.log("Hit PUT ROUTE")
  console.log("current User:", req.session.currentUser._id)
  User.findById(req.session.currentUser._id)
  .exec(function(err, user){
    var product = user.products.id(req.params.id);
    product.name = req.body.name;
    product.name = req.body.name;
    product.productt = req.body.product;
    product.uses = req.body.uses;
    product.routine = req.body.routine;
    product.favorites = req.body.favorites;
    product.details = req.body.details;
    product.rating = req.body.rating;
    product.bought = req.body.bought;
    product.refill = req.body.refill
    return user.save();
  })
  .then(function(user){
    res.redirect('/users/' + req.session.currentUser._id);
  })
});


//removing a product from the list
router.delete('/:id', function(req, res){
  User.findByIdAndUpdate(req.session.currentUser._id, {
    $pull:{
      products: {_id: req.params.id}
    }
  })
  .exec(function(err, restaurant){
    if (err) console.log(err);
        res.redirect('/users/' + req.session.currentUser._id);
  });
});


//index for products
//rmr to add authorize back into route
// router.get('/', function(req, res){
//   console.log('index route');
//   User.findById(req.params.id)
//     .exec(function(err, user){
//       if (err) {console.log(err);}
//       res.render, {};
//     });
// });
//
// router.get('/new', function(req, res){
//   console.log('hit products/new route');
//   res.render('users/new');
// })
//
//
// //Product update SHOW route
// router.get('/:id/edit', function(req, res){
//   console.log("Testing REQ.Params:", req.params)
//   User.findById(req.session.currentUser._id)
//   .exec(function(err, user){
//     if (err) {console.log(err);}
//     res.send(product);
//   });
// });
//
// //product delete
// router.put('/:id/:pId', authHelpers.authorize, function(req, res){
//   Product.findByIdAndUpdate(req.params.pId, req.body)
//   .exec(function(err, product){
//     if (err) {console.log(err);}
//     product.save();
//     res.redirect (`/products/${req.params.id}/${req.params.pId}`);
//   });
// });
//
//
// //products delete
// router.delete('/:id/:pId', authHelpers.authorize, function(req, res){
//   Products.findByIdAndRemove(req.params.pId)
//     .exec(function(err){
//       if (err) {console.log(err);}
//       res.send('Product has been deleted');
//     });
// });
//
// //show products
// router.get('/:id', authHelpers.authorize, function(req, res){
//   Products.findById(req.params.pId)
//     .exec(function(err, product){
//       if(err) {console.log(err);}
//       res.send(product);
//     });
// });







module.exports = router;
