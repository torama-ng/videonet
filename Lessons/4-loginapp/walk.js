// walk through given path to return list of files per folder

const fs = require("fs");
const path = require("path");

// mkdir if not exits
const mkdirSync = function (dirPath) {
  try {
    fs.mkdirSync(dirPath)
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}
mkdirSync('./videos');

mkdirSync('./videos/upload');

var walkSync = function (dir, filelist) {
  filelist = [];
  const fullPath = path.join(__dirname, 'videos',dir);
  mkdirSync(fullPath);
  const vdir = path.join('videos', dir);
  
  fs.readdir(vdir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (!fs.statSync(vdir + "/" + file).isDirectory()) {
        filelist.push(encodeURI(  dir + '/'+ file));
      }
    });
  });
  return filelist;
};

// List all files in videos directory after search
var searchSync = function (dir, searchlist) {
  searchlist = [];
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(folder => {
      fs.readdir(dir + "/" + folder, (err, files) => {
        if (err) throw err;
        files.forEach(video => {
          searchlist.push(video);
        });
      })
    });
  });
  return searchlist;
};

// export object containing list of directories
module.exports = {
  walkSync
};