//this files fills up the database without using postman which is awesome!
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
mongoose.connect('mongod://localhost/skincare');

var User = require('../models/product');
var Item = require('../models/user');

//use native promises
mongoose.Promise = global.Promise;

//First we clear the database of existing user and items
// Item.remove({}, function(err){
//   console.log(err);
// });
//
// User.remove({}, function(err){
//   console.log(err);
// });

//create new users
var emily = new User({
  email: 'em@me.com',
  password_digest: 'hello',
  products:[ProductsSchema]
});
