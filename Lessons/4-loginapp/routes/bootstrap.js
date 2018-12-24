var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('bootstrap');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Bootstap Videos',
    videoFiles: walkSync,
    videoDir: 'Bootstrap'

  });
});

module.exports = router;
