const path = require('path');
const pubPath = path.join(__dirname,'../public');
const express = require('express');

const port = process.env.PORT || 3000;

var app = express();
console.log(pubPath);
app.use(express.static(pubPath));
app.listen(port, () =>{
    console.log(`Starting server on port ${port}`);
});
