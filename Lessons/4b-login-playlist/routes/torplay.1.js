var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");

// Get course routes
// Get bootstrap course routes
router.get('/bootstrap', ensureAuthenticated, function(req, res){
  console.log(req.body);
  console.log(req.params);
  
  console.log(req.query);
  
  // Each folder is a video category.
  // for each category, get all the mp4 files
  catObj = [];  //store all folders and their mp4files
  folder = 'bootstrap';
  fpath = path.join(__dirname, '../videos',folder);
	
	mp4files = fs.readdirSync(fpath);
	let stats = fs.statSync(fpath);
	mtime = new Date(stats.mtime);
	let seconds = (new Date().getTime() - stats.mtime) / 1000;
	let gid = stats.dev + stats.ino;
	let days = (seconds/(60*60*24)).toFixed(0);
		
	catObj.push({category:folder,files:mp4files,mtime:days,gid:gid})
  
	res.render('view_play', { 
	videoTitle: 'Bootstrap Play List',
	videoGroup: catObj,
	videoDir: 'Bootstrap',
		
  });
});

// Get upload route
router.get('/upload', ensureAuthenticated, function(req, res){
  
  // Each folder is a video category.
  // for each category, get all the mp4 files
  
  console.log(req.body);
  console.log(req.params);
  
  console.log(req.query);
  
  catObj = [];  //store all folders and their mp4files
  folder = 'upload';
  fpath = path.join(__dirname, '../videos',folder);
	
	mp4files = fs.readdirSync(fpath);
	let stats = fs.statSync(fpath);
	mtime = new Date(stats.mtime);
	let seconds = (new Date().getTime() - stats.mtime) / 1000;
	let gid = stats.dev + stats.ino;
	let days = (seconds/(60*60*24)).toFixed(0);
		
	catObj.push({category:folder,files:mp4files,mtime:days,gid:gid})
  
	res.render('view_play', { 
	videoTitle: 'Upload Play List',
	videoGroup: catObj,
	videoDir: 'Upload',
		
  });
});


// Get nodejs route
router.get('/nodejs', ensureAuthenticated, function(req, res){
  
  // Each folder is a video category.
  // for each category, get all the mp4 files
  
  console.log(req.params.path);
  console.log(req.path)

  catObj = [];  //store all folders and their mp4files
  folder = path.basename(req.path);
  console.log(folder);

  fpath = path.join(__dirname, '../videos',folder);
	
	mp4files = fs.readdirSync(fpath);
	let stats = fs.statSync(fpath);
	mtime = new Date(stats.mtime);
	let seconds = (new Date().getTime() - stats.mtime) / 1000;
	let gid = stats.dev + stats.ino;
	let days = (seconds/(60*60*24)).toFixed(0);
		
	catObj.push({category:folder,files:mp4files,mtime:days,gid:gid})
  
	res.render('view_play', { 
	videoTitle: 'nodejs Play List',
	videoGroup: catObj,
	videoDir: 'nodejs',
		
  });
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;