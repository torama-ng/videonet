var express = require('express');
var router = express.Router();
const walk = require('../walk.js');

var walkSync = [];
walkSync = walk.walkSync('bootstrap');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'bootstrap Videos',
    videoFiles: walkSync,
    videoDir: 'Bootstrap'

  });
});

module.exports = router;
