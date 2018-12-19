const express = require("express");
const router = express.Router();
const path = require('path');
const walk = require('../walk.js');
const multer = require('multer');

var walkSync = [];
walkSync = walk.walkSync('videos/uploads');

var storage = multer.diskStorage({
  destination: './videos/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + path.extname(file.originalname));
  }
});

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
}).single('filename');


// check file upload type
function checkFileType(file, cb) {
  // allowed extensions
  const filetypes = /mp4/;

  // checking the ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb('Error: Not a valid file!');
  }
}


router.get('/', (req, res) => {
  res.render('upload');
});

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('/upload', {
        msg: err
      });
    } else {
      console.log(req.file);
      if (req.file == undefined) {
        res.render('/', {
          msg: 'error: No file selected!'
        })
      } else {
        res.render('/', {
          msg: 'File upload successful!',
          file: `uploads/${req.file.filename}`
        })
      }
    }
  })
});

module.exports = router;