var express = require('express');
var router = express.Router();

const {check, validationResult} = require('express-validator');



var Messages  = require("../schemas/message");


/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('home', { title:'We are at the home.'})
});

//Code to ensure that we are logged in

function ensureIsLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
      res.redirect("/signIn");
  }
  else {
      next();
  }
}

/*Use this to check if we are logged in

  .get(ensureIsLoggedIn, (req, res) =>{
    //This is where you wrap the response 
  })

*/


/*
REMOVED THIS ROUTE, incorrect path, incorrect render 
router.get('/home', function(req, res, next) {
  res.render('home');
});
*/
router.route('/addBlog').get(ensureIsLoggedIn, (req, res, next) =>{
  res.render('addBlog')
}).post(async(req, res, next) =>{
  console.log(JSON.stringify(req.body))
  await check("title", "Title is required").notEmpty().run(req);
  await check("message", "Name is required").notEmpty().run(req);
  var errors = validationResult(req);

  if(errors.isEmpty()){
    let newMessage = new Messages();
    newMessage.title = req.body.title;
    newMessage.message = req.body.message;
  
    newMessage.save((error) =>{
  
      if(error){
        console.log(JSON.stringify(error));
        console.log("DB error")
        res.render('addBlog')
  
      }
      else{
        res.redirect("/home")
      }
    })
  } else{
    console.log(errors)
    res.render('addBlog', {errors: errors.array()})
  }

})
module.exports = router;
