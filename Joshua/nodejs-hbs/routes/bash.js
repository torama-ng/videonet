var express = require('express');
var router = express.Router();
const walk = require('../walk.js');

var walkSync = [];
walkSync = walk.walkSync('videos/bash');

const {
  ensureAuthenticated
} = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('view', {
    videoTitle: 'Bash Videos',
    videoFiles: walkSync,
    videoDir: 'Bash'
  });
});



module.exports = router;