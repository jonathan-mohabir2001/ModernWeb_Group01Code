/*

Find the routing section under the handlers directory/index.js
*/

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000; 
// our express is imported, app is set, and port is set. 
const fs = require('fs')
const path = require('path')

const routes = require('./handlers/handlers')
// routes contant responsible for routing. 
// /handlers/handlers.js
app.get('/', routes.home)
app.get('/signup', routes.signUp)
app.get('/login',routes.login)
app.get('/addblog', routes.addBlog)
// four routes to render our 4 pug pages. 



app.set('view engine', 'pug')
// setting the view engine to pug. Allows for rendering of pug files. 

app.listen(PORT, () => {
  console.log(`Server started press on port ${PORT}  press ctrl +c to end.`)
})

// new comment added below. 