var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];
walkSync = walk.walkSync('videos/linux');

const {
  ensureAuthenticated
} = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('view', {
    videoTitle: 'Linux Videos',
    videoFiles: walkSync,
    videoDir: 'Linux'

  });
});



module.exports = router;