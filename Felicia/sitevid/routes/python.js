var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];

walkSync = walk.walkSync('python');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Python Videos',
    videoFiles: walkSync,
    videoDir: 'Python'

  });
});



module.exports = router;
