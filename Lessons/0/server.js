const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000
app.set('view engine','ejs');

app.get(['/','index.html'], function (req, res) {
    res.render('index.ejs',{
        userName:'toruser1',
        videoFile1:'/videos/1.mp4',
        videoFile2:'/videos/2.mp4',
        videoFile3:'/videos/3.mp4'
    });
})
console.log(__dirname);
app.get(['/videos/1.mp4'], function (req, res) {
    res.sendFile(__dirname +'/videos/1.mp4');
})
app.get(['/videos/2.mp4'], function (req, res) {
    res.sendFile(__dirname + '/videos/2.mp4');
})
app.get(['/videos/3.mp4'], function (req, res) {
    res.sendFile(__dirname +'/videos/3.mp4');
})


app.get(['/static/my.css'], function (req, res) {
    res.sendFile('./static/my.css');
})

app.get(['/static/misc.js'], function (req, res) {
    res.sendFile('./static/misc.js');
})

app.listen(port, function() {
    console.log('Listening on ${port}');    
})
