var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('videos/python');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    videoTitle: 'Python Videos',
    videoFiles: walkSync,
    videoDir: 'Python'

  });
});

module.exports = router;
