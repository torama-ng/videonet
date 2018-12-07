var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];
walkSync = walk.walkSync('videos/nodejs');

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(walkSync);
  res.render('view', {
    videoTitle: 'Nodejs Videos',
    videoFiles: walkSync,
    videoDir: 'Nodejs'

  });
});



module.exports = router;