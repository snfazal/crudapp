
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var ProductSchema = new Schema({
  name: String,
  product: String,
  uses: String,
  routine: String,
  favorites: Boolean,
  details: String,
  rating: Number,
  bought: Date,
  refill: Date
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

ProductSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

var UserModel = mongoose.model('User', UserSchema);
var ProductModel = mongoose.model('Product', ProductSchema);

module.exports = {
  User: UserModel,
  Product: ProductModel
}
