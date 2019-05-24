//Load Libraries
const express = require('express')
const app = express();
const path = require('path');

//Load static files
app.use("/dist", express.static(__dirname + "/dist"));
app.use("/data", express.static(__dirname + "/data"));
app.use("/css", express.static(__dirname + "/css"));

//Index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(80, () => {
  console.log('BikeRent app listening on port 80!')
});


