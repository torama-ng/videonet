var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);
var walkSync = [];
walkSync = walk.walkSync('videos/odoo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('odoo', { 
    videoTitle: 'Odoo Videos',
    videoFiles: walkSync,
    videoDir: 'Odoo'

  });
});



module.exports = router;