var express = require('express');
var router = express.Router();
var walkSync = [];
 
/* GET home page. */
router.get('/',ensureAuthenticated, function(req, res, next) {
  const walk = require('../walk.js');
  walkSync = walk.walkSync('angular');
  
  res.render('view', { 
    videoTitle: 'Angularjs Videos',
    videoFiles: walkSync,
    videoDir: 'Angular'

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
