/*
Group 01 codebase. 

Created by: Jonathan M, Jason.N, Jason.T, Quang Lam.H 

*/
const express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dataBaseConfig = require('../../config/database');
const passport = require('passport');
require('../../config/passport')(passport);
const session = require('express-session');

//Connecting to cloud database
mongoose.connect(dataBaseConfig.connectionString);
let dbconnection = mongoose.connection;
dbconnection.once('open', () => {
  console.log('Connected to mongodb');
});
dbconnection.on('error', () => {
  console.log('Failed to execute db command');
});

//START OF ROUTES
var indexRouter = require('../../routes/index');
var usersRouter = require('../../routes/users');
var blogRouter = require('../../routes/blog');
//END OF ROUTES
const app = express();

//random line

//START OF VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//END OF VIEW ENGINE SETUP

//START OF MIDDLE WARE

app.use(express.static(path.join(__dirname, 'public')));

//Session setup
app.use(
  session({
    secret: 'qewrdafaeasdfrt',
    resave: false,
    saveUninitialized: false,
    cookie: {},
  })
);

//Starting Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//END OF MIDDLE WARE

//START OF ROUTES.
app.use('/', indexRouter, usersRouter);
app.use('/home', indexRouter);
app.use('/blog', blogRouter);
// END OF ROUTES.

// route to index and users.
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
module.exports = app;
