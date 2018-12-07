var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];

walkSync = walk.walkSync('videos/python');
nof = walkSync.length;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('view', {
    videoTitle: 'Python Videos',
    videoFiles: walkSync,
    noFiles: nof,
    videoDir: 'Python'

  });
});



module.exports = router;