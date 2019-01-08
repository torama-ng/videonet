const express = require('express');
const router = express.Router();
const walk = require('../walk.js');
const {
  ensureAuthenticated
} = require('../config/auth');

var allVideos = [];
allVideos = walk.videoSync('videos');



/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('videos', {
    pageTitle: 'Video Files',
    videoList: allVideos,
    videoDir: 'Videos'
  });
});



module.exports = router;