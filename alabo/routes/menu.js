var express = require('express');
var router = express.Router();
const walk = require('../walk.js');



var walkSync = [];
walkSync = walk.walkSync('videos');


/* GET home page. */
router.get('/bash', function(req, res, next) {

    res.render('view', {
        videoTitle: 'Bash Videos',
        videoFiles: walkSync,
        videoDir: 'bash',

    });

});


router.get('/html', function(req, res, next) {

    res.render('view', {
        videoTitle: 'HTML Videos',
        videoFiles: walkSync,
        videoDir: 'html',

    });

});


router.get('/java', function(req, res, next) {

    res.render('view', {
        videoTitle: 'Java Videos',
        videoFiles: walkSync,
        videoDir: 'java',

    });

});


router.get('/javascript', function(req, res, next) {

    res.render('view', {
        videoTitle: 'JavaScript Videos',
        videoFiles: walkSync,
        videoDir: 'javascript',

    });
});

router.get('/linux', function(req, res, next) {

    res.render('view', {
        videoTitle: 'Linux Videos',
        videoFiles: walkSync,
        videoDir: 'linux',

    });

});


router.get('/nodejs', function(req, res, next) {

    res.render('view', {
        videoTitle: 'Nodejs Videos',
        videoFiles: walkSync,
        videoDir: 'bash',

    });

});


router.get('/odoo', function(req, res, next) {

    res.render('view', {
        videoTitle: 'Odoo Videos',
        videoFiles: walkSync,
        videoDir: 'odoo',

    });

});

router.get('/python', function(req, res, next) {

    res.render('view', {
        videoTitle: 'Python Videos',
        videoFiles: walkSync,
        videoDir: 'python',

    });
});



module.exports = router;