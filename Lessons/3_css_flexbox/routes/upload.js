var express = require('express');
var router = express.Router();
const upload = require('express-fileupload');
router.use(upload());

/* GET home page. */
router.get('/', function(req, res, next) {
  
  console.log(req);
});

router.post("/",function(req,res,next){
  
  if (req.files) {
    
    var file = req.files.filename;
    filename = file.name;
    file.mv ("./videos/upload/" + filename, function(err) {
      if (err) {
        console.log(err)
        res.render("error",{
          file:filename
        });
      }
      else {
        res.render('upload', { 
          file: filename
      
        });
      }
    })
  }
})

module.exports = router;
