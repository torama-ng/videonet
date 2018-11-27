const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const dirwalk = require('./walk.js');

// test dirwalk
const mydir = __dirname + '/videos';
dirwalk(mydir, function(err, results) {
    if (err) throw err;
    console.log(results);
  });

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','ejs');

// Express Middleware
app.use('/videos', express.static('videos'));
app.use('/static', express.static('static'));

app.get(['/','index'], function (req, res) {
    res.render('index.ejs',{
        userName:'toruser1',
        videoFile1:'/videos/1.mp4',
        videoFile2:'/videos/2.mp4',
        videoFile3:'/videos/3.mp4'
    });
})

app.listen(port, function() {
    console.log(`Listening on port ${port}`);    
})
