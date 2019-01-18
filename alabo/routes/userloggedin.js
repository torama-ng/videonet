var express = require('express');
var router = express.Router();





/* Sign in router. */
router.get('/', function(req, res, next) {
    res.render('userlogged', {
        pagetitle: 'user logged in',

        page: 'userlogged in'

    });
});




module.exports = router;