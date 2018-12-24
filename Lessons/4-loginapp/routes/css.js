var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('css');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'CSS/SASS Videos',
    videoFiles: walkSync,
    videoDir: 'css/sass'

  });
});



module.exports = router;
