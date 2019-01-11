const express = require('express');
var busboy = require('connect-busboy');
var bodyParser = require('body-parser');
var cors = require('cors');
var fileUpload = require('express-fileupload');

var multer = require('multer');

var formidable = require('formidable');

//var fsExtra = require('fs-extra');

const router = express.Router();
const fs = require('fs');

router.use(fileUpload());

router.get('/',function(req,response,next){

    response.render('uploadView',{
        uploadText: 'Upload a file',
        name : ' '
    })
});

var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./videos/java/')
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now())
    }
});

var upload = multer({storage:storage});

/*
Listening for post request on http://localhost:3000/uploadFile
*/
router.post('/',function(req,res){
    if (req.files) {

      var file = req.files.filename;
      var filename = file.name;
      console.log(filename);
    
    }
    else{
        console.log('Not a file');
    }


});

module.exports = router;