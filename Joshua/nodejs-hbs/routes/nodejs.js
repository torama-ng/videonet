var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var walkSync = [];
walkSync = walk.walkSync('videos/nodejs');
const {
  ensureAuthenticated
} = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('view', {
    videoTitle: 'Nodejs Videos',
    videoFiles: walkSync,
    videoDir: 'Nodejs'

  });
});



module.exports = router;