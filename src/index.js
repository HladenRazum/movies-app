require('dotenv').config()
const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 7777

app.get('/', (req, res) => {
  res.send('Opa aaaaaa artiki')
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
