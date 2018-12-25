var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
console.log(__dirname);

var walkJson = {};
// Get nav menu that was clicked
// const navClicked = 
// join nav menu to videos folder
// videosDir = "videos/" + navClicked
walkJson = walk.walkJson('vue');
const videoTitle = walkJson.dir + " " + "Videos"

/* GET home page. */
router.get('/', function(req, res, next) {
  document.write(req);
  res.render('view', { 
    videoTitle: 'Vue Videos',
    videoFiles: walkSync,
    videoDir: 'Vue'

  });
});

module.exports = router;
