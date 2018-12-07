// walk through given path to return list of files per folder

var fs = require('fs');
var path = require('path');

const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

// List all files in a directory in Node.js recursively in a synchronous fashion
var walkSync = function(dir, filelist) {
 
  var fullPath = path.join(__dirname, dir);
  
  mkdirSync(fullPath);

  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (!fs.statSync(dir +'/' +file).isDirectory()) {
      // populate array
      filelist.push(encodeURI(file));
    }
   
  });
  return filelist;
};


// export object containing list of directories
module.exports = {walkSync};
// test it out on home directory
// dirwalk(process.env.HOME, function(err, results) {
 // if (err) throw err;
 // console.log(results);
//});