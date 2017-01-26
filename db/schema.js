
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var ProductSchema = new Schema({
  product: String,
  uses: String,
  routine: String,
  favorites: Boolean,
  details: String,
  Rating: Number,
  Bought: Date,
  Refill: Date
});

var UserSchema = new Schema({
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  products: [ProductSchema]
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

var UserModel = mongoose.model('User', UserSchema);
var ProductModel = mongoos.model('Product', ProductSchema);

module.exports = {
  Product: ProductModel,
  User: UserModel
}
