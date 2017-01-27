var bcrypt = require('bcrypt');
//requires
var User = require('../models/user.js');

function createSecure(req, res, next) {

  var password = req.body.password;
  console.log(password)

  res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  next();
}

function loginUser(req, res, next) {
  // stores email and password
  var email = req.body.email;
  var password = req.body.password;

  var query = User.findOne({ email: email }).exec()
  console.log(query);

  query.then(function(foundUser){
    console.log(foundUser);
    if (foundUser == null) {
      res.json({status: 401, data: "unauthorized"})

    } else if (bcrypt.compareSync(password, foundUser.password_digest)) {
      req.session.currentUser = foundUser;
    }
    next()
  })
  .catch(function(err){
    console.log('catching login error')
    res.json({status: 500, data: err})
  });
}

function authorize(req, res, next) {
  var currentUser = req.session.currentUser;

  if (!currentUser || currentUser._id !== req.params.id ) {
    res.json({status: 401, data: 'unauthorized'});
  } else {
    next();
  }
};

module.exports = {
  createSecure: createSecure,
  loginUser: loginUser,
  authorize: authorize
}
