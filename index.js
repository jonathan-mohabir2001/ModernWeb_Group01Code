const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000; 
// our express is imported, app is set, and port is set. 
const fs = require('fs')
const path = require('path')










app.set('view', path.join(__dirname,"views"))
app.set('view engine', 'pug')
// setting the view engine to pug. Allows for rendering of pug files. 

app.listen(PORT, () => {
  console.log('Server started press ctrl +c to end.')
})

