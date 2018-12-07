var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('videos/ejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'EJS Videos',
    videoFiles: walkSync,
    videoDir: 'EJS'

  });
});

module.exports = router;
