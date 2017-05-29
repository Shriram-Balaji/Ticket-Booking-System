const express = require('express');
const cors = require('cors');
const fs = require('fs');

function getJSON(filepath) {
  return JSON.parse(fs.readFileSync(filepath,"utf-8"));
}

const app = express();

app.use('/components', express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/src'));


app.get('/data',cors(),function(req,res){
  res.json(getJSON("data.json"));
}).listen(8000);
