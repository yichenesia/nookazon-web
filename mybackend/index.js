const express = require('express')
const app = express()
const port = 5000
const fs = require('fs');





app.get('/productlist', (req, res) => {
    let rawdata = fs.readFileSync('productlist.json');
    let items = JSON.parse(rawdata);

    
  console.log(`Return product list: `)
  res.send(items["list"])
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })