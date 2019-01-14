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
      filePath = path.join(vdir,file);
      
      if (!fs.statSync(filePath).isDirectory()) {
        ufile = encodeURI(file)
        url1 = path.join(dir, ufile);
       
        filelist.push(ufile);
        
      }
    });
   
  });
  // console.log(`filelist content is  ${filelist}`); 
       
  return filelist;
};

// export object containing list of directories
module.exports = {
  walkSync
};