var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('javascript');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Javascript Videos',
    videoFiles: walkSync,
    videoDir: 'Javascript'

  });
});



module.exports = router;
