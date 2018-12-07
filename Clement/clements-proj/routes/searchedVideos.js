var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
var searchSync = [];



//const misc = require('../public/javascripts/misc.js');

searchSync = walk.searchSync('videos');
//var searchText = misc.getText();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('view', { 
    videoTitle: "Searched Videos",
    videoFiles: searchSync,
    videoDir: 'All Videos'

  });
});



module.exports = router;
