var cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())

const port = 5000
const fs = require('fs');

app.post('/saveuserorder', (req, res) => {
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // at this point, `body` has the entire request body stored in it as a string
    var parsedBody = JSON.parse(body);
    let rawdata = fs.readFileSync('userorder.json');
    var items = JSON.parse(rawdata);  //parse the JSON
    items.push({ 
        "id": (new Date().getTime()), "userOrder": parsedBody
    });

    var txt = JSON.stringify(items);  //reserialize to JSON

    fs.writeFile('userorder.json', txt, err => {
      if (err) {
        console.error(err)
        return res.json({"status": "failed"});
      }
      return res.json({"status": "ok"});
      //file written successfully
    })
  });
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