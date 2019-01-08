var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
const {
  ensureAuthenticated
} = require('../config/auth');

var walkSync = [];
walkSync = walk.walkSync('videos/java');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('view', {
    videoTitle: 'Java Videos',
    videoFiles: walkSync,
    videoDir: 'Java'

  });
});



module.exports = router;