var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('usersignup', {
        pagetitle: 'user signup',

        page: 'User registration'

    });
});



module.exports = router;