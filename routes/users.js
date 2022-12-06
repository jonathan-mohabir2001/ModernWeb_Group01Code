var express = require('express');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs"); 
const User = require('../schemas/users')
const passport = require('passport');
var router = express.Router();

/* User Registration */
router.route('/signUp').get((req, res, next)=>{
  res.render('signUp', {})
}).post(async(req, res, next) =>{
  await check("name", "Name is required").notEmpty().run(req);
  await check("email", "Email is required").notEmpty().run(req);
  await check("email", "Email is invalid").isEmail().run(req);
  await check("username", "Username is required").notEmpty().run(req)
  await check("password", "Password is required").notEmpty().run(req);
  await check("passwordConfirm", "Password Confirm is required").notEmpty().run(req);
  await check("password", "Passwords do not match").equals(req.body.passwordConfirm).run(req);
  var errors = validationResult(req);
  if(errors.isEmpty()){
    let newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.username = req.body.username;
    bcryptjs.genSalt(15, (error, salt) => {
      bcryptjs.hash(req.body.password, salt, (error, passwordHash) =>{
        if (error){
          console.log(JSON.stringify(error));
          
        }
        else{
          newUser.password = passwordHash
          newUser.save((error) =>{
            if(error){
              console.log(JSON.stringify(error));
              res.render('signUp', {DBerror: error})
            }
            else{
              res.redirect("/signIn")
            }
          })
        }
      })
    })
  }
  else{
    res.render('signUp', {errors: errors.array()})
  }
})

router.route('/SignIn').get((req, res, next) =>{
  res.render('signIn', )
}).post(async(req, res, next) =>{
  console.log("signing In")
  await check("username", "Username is required").notEmpty().run(req);
  await check("password", "Password is required").notEmpty().run(req);
  var errors = validationResult(req);
  if (errors.isEmpty()){
    passport.authenticate("local", {
      successRedirect: "/addBlog",
      //SUCCESS REDIRECT - REDIRECT TO ADD A BLOG PAGE. 
      failureRedirect: "/signIn",
      failureMessage: true
    })(req, res, next);
  }
  else {
    res.render('signIn', {errors: errors.array() });
  }
  
});

router.route('/signOut').get((req, res, next) => {
  req.logOut((error) =>{
    if(error){
      return next(error)
    }
    res.redirect("/signIn");
  })
})
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
