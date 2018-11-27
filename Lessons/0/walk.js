// walk through given path to return list of files per folder

var fs = require('fs');
var path = require('path');
 
// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir +'/' +file).isDirectory()) {
      filelist = walkSync(dir + '/'+ file + '/', filelist);
    }
    else {
      filelist.push(dir+'/'+file);
    }
  });
  return filelist;
};

module.exports = {walkSync};
// test it out on home directory
// dirwalk(process.env.HOME, function(err, results) {
 // if (err) throw err;
 // console.log(results);
//});