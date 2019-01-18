var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:v', function(req, res, next) {
  var url = req.params.v;
  console.log(url)

   if(url){
    
    res.render('playarea', { 
     url
    });
  }
  
});

module.exports = router;
