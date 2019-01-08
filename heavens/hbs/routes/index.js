var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('videos');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    videoTitle: 'Nodejs Videos',
    videoFiles: walkSync,
    videoDir: 'Nodejs'

  });
});

module.exports = router;
