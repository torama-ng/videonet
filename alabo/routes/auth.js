var express = require('express');
var router = express.Router();
var User = require('../db/users');




module.exports = function(passport) {

    router.post('/usersignup', function(req, res, ) {
        var body = req.body,
            username = body.username,
            fullname = body.fullname,
            email = body.email,
            password = body.password;
        repassword = body.repassword;

        User.findOne({ username: username }, function(err, doc) {
            if (err) { res.status(500).send("error occured") } else {
                if (doc) {
                    if (err) { res.status(500).send("already exists") }
                } else {
                    var record = new User()
                    record.username = username;
                    record.fullname = fullname;
                    record.email = email;
                    if (!password == repassword) {
                        res.status(500).send("password didn't match");
                    } else if (password === repassword) {
                        record.password = record.hashpassword(password)

                    }
                    record.save(function(err, user) {
                        if (err) {
                            res.status(500).send("Registration Failled")
                        } else {
                            res.send(User)
                        }
                    })

                }
            }
        })
    });
    return router;
};