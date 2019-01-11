var express = require('express');
var router = express.Router();
const scan = require('../scan.js');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('videos', {
        videoTitl: 'javascript Files',
        javascriptfiles: walkSync,
        videoDir: 'videos'

    });
});



module.exports = router;