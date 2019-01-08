var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];
const {
  ensureAuthenticated
} = require('../config/auth');

walkSync = walk.walkSync('videos/python');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('view', {
    videoTitle: 'Python Videos',
    videoFiles: walkSync,
    videoDir: 'Python'
  });
});



module.exports = router;