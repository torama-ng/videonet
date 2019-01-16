// walk through given path to return list of  subfolders

const fs = require("fs");
const path = require("path");
var dirlist = [];

function walkFS (dir) {
  
  console.log(`top folder is  are   ${dir}`); 
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    
    dirlist = files;
    console.log(`1. Categories are   ${dirlist}`); 
   
  });
  console.log(`2.Categories are   ${dirlist}`); 
  return dirlist;
       
};

// export object containing list of directories
module.exports = {
  walkFS
};