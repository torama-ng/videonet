var express = require('express');
var router = express.Router();
const walk =  require('../walk.js');
var walkSync = [];
walkSync = walk.walkSync('javascript');

console.log(__dirname + '/javascript');

/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  res.render('view', { 
    videoTitle: 'Javascript Videos',
    videoFiles: walkSync,
    videoDir: 'Javascript'

  });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;
