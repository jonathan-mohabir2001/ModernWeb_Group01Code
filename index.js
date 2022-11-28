/*
BlogPost Application created by Group -01
//jason wuz here
*/
const express = require('express')
const app = express()
const PORT = process.env.PORT ||8000; 
// Express imported, app set, port set. 
const fs = require('fs')
const path = require("path"); 
// path and filesystem imported
const mongoose = require('mongoose')
const db = mongoose.connection; 
// Mongoose module imported, constant db assigned connection methods. 


mongoose.connect("mongodb://localhost/blogpost")
// connection string set. 

db.once("open", function(){
  console.log("Succesful connection to MongoDB")
})

// function here logs a connection message for successful connection 
db.on("error", function(error){
  console.log("We have an erorr")
})
// function here logs an error if there is one when the app starts. 
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
// middleware configurations 

app.set('/', path.join(__dirname ,'views'))
app.set('view engine', 'pug')
// view engine set to view pug files. 

var jason
app.get('/', (req,res) => {
  res.render('home.pug')
})

app.get('/signup', (req, res) => {
  res.render('signUp.pug')
})

app.get('/login', (req, res) => {
  res.render('login.pug')
})
app.get('/addBlog', (req, res) => {
  console.log("Liam")
  res.render('addBlog.pug')
})

//NEW ADD 
app.get('/world',(req, res)=>{
  res.send('hello hello ')
})

// hello hello new line added. 


app.listen(PORT, () => {
  console.log(`Server started on ${PORT} press ctrl+c to end`)
}) // listener for when the app starts. 