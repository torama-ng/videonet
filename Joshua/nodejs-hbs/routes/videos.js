const express = require('express');
const router = express.Router();
const walk = require('../walk.js');

var allVideos = [];
allVideos = walk.videoSync('videos');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('videos', {
    pageTitle: 'Video Files',
    videoList: allVideos,
    videoDir: 'Videos'
  });
});



module.exports = router;