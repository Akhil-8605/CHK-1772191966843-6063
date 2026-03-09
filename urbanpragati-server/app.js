const express = require('express')
const app = express()
const port = 6005

app.get('/user', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})