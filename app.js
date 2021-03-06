var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis   = require("redis");
var client  = redis.createClient({
    password:'qaz123!@#'
});
var app = express();

//////////////////////////////////////////////////////////////////////////

// view engine setup
app.set('views', path.join(__dirname, 'views/'));
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

//use static path
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use("/views",express.static(path.join(__dirname, 'views')));
app.use("/node_modules",express.static(path.join(__dirname, 'node_modules')));


// use babel
require('babel-register');

const session = require("express-session");
var RedisStrore = require('connect-redis')(session);

app.use(session({
    secret: 'ssshhhhh',
    // create new redis store.
    store: new RedisStrore({ client: client,ttl :  260,pass: 'qaz123!@#'}),
    saveUninitialized: false,
    resave: false
}));


var path = require('path');
global.appRoot = path.resolve(__dirname);

//////////////////////////////////////////////////////////////////////////

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


var http = require('http');


var indexRouter = require('./routes/index');
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log('Server running at http://127.0.0.1:3000/');

module.exports = app;
