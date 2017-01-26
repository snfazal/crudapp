var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var hbs = require('hbs')
var mongoose = require('mongoose');

//require the controllers so that they render onthe page
var usersController = require('./controllers/users.js');
var sessionsController = require('./controllers/sessions.js');
var productsController = require('./controllers/products.js');

var app = express();

// ADD THE NAME OF YOUR DATABASE
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/skincare';
mongoose.connect(mongoURI);

app.set('view engine', 'hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(logger('dev'));
app.use(methodOverride('_method'));

app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));

app.use('/users', usersController);
app.use('/sessions', sessionsController);
app.use('/products', productsController);

// Now that we're connected, let's save that connection to the database in a variable.
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function(){
  console.log('database connected!');
});

app.get('/', function(req, res){
  res.render('home/home');
});

app.listen(process.env.PORT || 4000, function(){
  console.log('============');
  console.log('WERK, WERK');
  console.log('============');
});
