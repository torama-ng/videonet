var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = walk.walkSync('videos');

console.log(__dirname);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    videoTitle: 'Torama Video Portal (index)',
    lessonNumber: 'Lesson 1',
    videoDir: 'Root (videos)',
    videoFiles: walkSync
  });
});

module.exports = router;

