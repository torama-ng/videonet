const express = require('express');
const router = express.Router();
const path = require("path");


function reformat(txt){
  txt = path.basename(txt,'.mp4');
  txt =  decodeURI(txt);
  txt = txt.replace(/-/g, ' ');
  txt = txt.replace(/&/g, ' ');
  txt = txt.replace(/\//g, ' ');
  txt = txt.replace(/\\/g, ' ');
  return txt;
}

function getVideoTag(clsName,srcURL ) {
  return '<video class="' + clsName + '"  controls src="' + srcURL +'" type="video/mp4">'+ 
    'Your browser does not support video html 5 video tag</video>';

}

function getCardBody(srcUrl,index) {
  cstr = '<div class="card-body" ><p class="card-text">'+ reformat(srcUrl)+'</p>';
  cstr += '<div class="d-flex justify-content-between align-items-center">';
  cstr += '<div class="btn-group">';
  cstr += '<button type="button" class="btn btn-sm btn-outline-secondary">View</button>';
  cstr += '<button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>';                                
  cstr += '</div>';
  cstr += '<small class="text-muted" id="vid-' + index +'"></small>';
  cstr += '</div></div></div>';
  return cstr;

}

var walkSync = [];
const walk = require('../walk.js');
walkSync = walk.walkSync('bootstrap');
  

/* GET route */
router.get('/',ensureAuthenticated, function(req, res, next) {
  cardDivs = [];
  cardstr = '<div class="card shadow-sm ">';
  
  walkSync.forEach(function (mp4file, index) { 
    cardstr2 = cardstr + getVideoTag("bd-placeholder-img card-img-top",mp4file);
    cardstr2 += getCardBody(mp4file,index);

    cardDivs.push(cardstr2);                                                      
                              
  });
                          
  res.render('view_f', { 
    videoTitle: 'bootstrap Videos',
    videoFiles: cardDivs,
    videoDir: 'Bootstrap',
    videoGroup: 'Bootstrap'

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
