var cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const port = 5000
const fs = require('fs');

app.post('/saveuserorder', (req, res) => {
  console.log(req);
  console.log(req.body);
  const content = req.body;
  fs.writeFile('userorder.json', content, err => {
    if (err) {
      console.error(err)
      return
    }
    //file written successfully
  })
})

app.get('/productlist', (req, res) => {
    let rawdata = fs.readFileSync('productlist.json');
    let items = JSON.parse(rawdata);

    
  console.log(`Return product list: `)
  res.send(items["list"])
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })