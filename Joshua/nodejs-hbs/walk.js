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

// walk through given path to return list of files per folder
let walkSync = function (dir, filelist) {
  filelist = [];
  const fullPath = path.join(__dirname, dir);
  mkdirSync(fullPath);
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      if (!fs.statSync(dir + "/" + file).isDirectory()) {
        filelist.push(encodeURI(file));
      }
    });
  });
  return filelist;
};

// List all files in videos directory after search
let videoSync = function (dir, videoList) {
  videoList = [];
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach(folder => {
      fs.readdir(dir + "/" + folder, (err, files) => {
        if (err) throw err;
        files.forEach(video => {
          videoList.push({
            path: folder + '/' + video,
            title: video,
            category: folder
          });
        });
      })
    });
  });
  return videoList;
};

module.exports = {
  walkSync,
  videoSync
};