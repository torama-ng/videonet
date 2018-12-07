var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('videos/angular');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Angular Videos',
    videoFiles: walkSync,
    videoDir: 'Angular'

  });
});

module.exports = router;
