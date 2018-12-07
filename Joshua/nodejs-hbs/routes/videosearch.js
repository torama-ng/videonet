var express = require('express');
var router = express.Router();
const walk = require('../walk.js');

var searchSync = [];
searchSync = walk.searchSync('videos');


/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(searchSync);
  res.render('videosearch', {
    pageTitle: 'Video Files',
    searchList: searchSync,
    videoDir: searchSync
  });
});



module.exports = router;