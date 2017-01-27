var bcrypt = require('bcrypt');
//requires
var User = require('../models/user.js');

function createSecure(req, res, next) {
  console.log('hit createSecure');
  console.log(req.body);
  var password = req.body.password;
  console.log('=====password below=========')
  console.log(password)
  console.log('==============')

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
      console.log('found current user')
      console.log(req.session.currentUser)
    }
    next()
  })
  .catch(function(err){
    console.log('catching login error')
    res.json({status: 500, data: err})
  });
}

function authorize(req, res, next) {
  console.log('authorize method')
  console.log('====current user below====')
  console.log(req.session.currentUser)

  var currentUser = req.session.currentUser;
  console.log(currentUser);

  if (!currentUser || currentUser._id !== req.params.id) {
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
