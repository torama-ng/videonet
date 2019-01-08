var express = require('express');
var router = express.Router();
const walk = require('../walk.js');
const session = require('express-session');


router.use(session({ secret: "_ajjvnjjcbvhbhvLiveNow", resave: false, saveUninitialized: true }));

var walkSync = [];
walkSync = walk.walkSync('videos/bash');


/* GET home page. */
router.get('/bash', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'Bash Videos',
            videoFiles: walkSync,
            videoDir: 'bash',
            user: req.session.user
        });
    }
});


router.get('/html', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'HTML Videos',
            videoFiles: walkSync,
            videoDir: 'html',
            user: req.session.user
        });
    }
});

router.get('/java', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'Java Videos',
            videoFiles: walkSync,
            videoDir: 'java',
            user: req.session.user
        });
    }
});


router.get('/javascript', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'JavaScript Videos',
            videoFiles: walkSync,
            videoDir: 'javascript',
            user: req.session.user
        });
    }
});

router.get('/linux', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'Linux Videos',
            videoFiles: walkSync,
            videoDir: 'linux',
            user: req.session.user
        });
    }
});


router.get('/nodejs', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'Nodejs Videos',
            videoFiles: walkSync,
            videoDir: 'bash',
            user: req.session.user
        });
    }
});


router.get('/odoo', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'Odoo Videos',
            videoFiles: walkSync,
            videoDir: 'odoo',
            user: req.session.user
        });
    }
});

router.get('/python', function (req, res, next) {
    if (req.session.user) {
        res.render('view', {
            videoTitle: 'Python Videos',
            videoFiles: walkSync,
            videoDir: 'python',
            user: req.session.user
        });
    }
});


module.exports = router;
