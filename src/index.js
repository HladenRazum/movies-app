const fs = require('fs')
const cors = require('cors')

require('dotenv').config()
const express = require('express')

const app = express()
app.use(
  cors({
    origin: ['http://localhost:5500', '*'],
  })
)
const PORT = process.env.PORT || 7777

app.get('/', (req, res) => {
  const range = req.headers.range
  if (!range) {
    res.send('error')
  }

  const videoPath = './public/movies/sample.mp4'
  const videoSize = fs.statSync(videoPath).size
  const chunkSize = 10 ** 6 // 1 MB
  const start = Number(range.replace(/\D/g, ''))
  const end = Math.min(start + chunkSize, videoSize - 1)
  const contentLength = end - start + 1

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  }

  res.writeHead(206, headers)

  const stream = fs.createReadStream(videoPath, { start, end })
  stream.pipe(res)
})

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})
