var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
const {
  ensureAuthenticated
} = require('../config/auth');

var walkSync = [];
walkSync = walk.walkSync('videos/odoo');

/* GET home page. */
router.get('/', ensureAuthenticated, function (req, res, next) {
  res.render('view', {
    videoTitle: 'Odoo Videos',
    videoFiles: walkSync,
    videoDir: 'Odoo'

  });
});



module.exports = router;