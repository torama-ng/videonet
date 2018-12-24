var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('mongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Mongo Videos',
    videoFiles: walkSync,
    videoDir: 'Mongo'

  });
});

module.exports = router;
