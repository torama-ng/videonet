var express = require('express');
var router = express.Router();
const walk = require('../walk.js');

var walkSync = [];
walkSync = walk.walkSync('mongod');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Mongo Videos',
    videoFiles: walkSync,
    videoDir: 'Mongo'

  });
});

// Ensure Authenticated
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}


module.exports = router;
