/*
Full stack app created by Group -01
*/

const express = require('express')
const app = express()
const PORT = process.env.PORT ||8000; 








app.listen(PORT, () => {
  console.log(`Server started on ${PORT} press ctrl+c to end`)
})