var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkSync = [];
walkSync = walk.walkSync('handlebars');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Handlebars Videos',
    videoFiles: walkSync,
    videoDir: 'Handlebars'

  });
});

module.exports = router;
