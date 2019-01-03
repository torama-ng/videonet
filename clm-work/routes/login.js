const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const jwt = require('jsonwebtoken');
var session = require('express-session');


router.use(session({secret:"_ajjvnjjcbvhbhvLiveNow",resave:false,saveUninitialized:true}));
// Encryption 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

// DB constants 
const url = "mongodb://localhost:27017/Toramadb";
const _databasename = "Toramadb";
const _collectionname = "torama_users";


router.get('/', (req, res, next) => {
    if(req.session.user){
      res.render("already_logged_in",{
          userData: req.session.user
      });
    }else{
        res.render('login', {});
    }
    //console.log(req.session.user);

    

})


router.post('/', (req, res, next) => {

    var email = req.body.email;
    var password = req.body.password;

    //req.checkBody('email','name is required').notEmpty();
    //req.checkBody('password','password is required').notEmpty();
    //req.checkBody('password','enter a valid email').isEmail();
   
    

    // console.log(email + ", " + password);

    mongoClient.connect(url, function (err, db) {

        
        var dbo = db.db(_databasename);
        var collections = dbo.collection(_collectionname);
        var encryptedUserpassword = cryptr.encrypt(password);

        console.log("Encrypted " + encryptedUserpassword);

        /*
        Since our password changes with every encryption we command.
        We have to loop through all the emails pertaining to that user,
        and match it with the decripted password of that email.
        */


        collections.find({ email: email }).toArray((error, result) => {

            if (error) throw error;

            else if (result.length) {

                result.forEach(element => {
                    var foundEmail = element.email;
                    var foundPassword = element.password;

                    var decryptedPword = cryptr.decrypt(foundPassword);
                    if (decryptedPword === password) {

                        console.log('Decrypted ' + decryptedPword + " and user provided " + password);

                        req.session.user = element;

                        res.render('loggedin_view', {
                            userData: req.session.user,
                            result: result,
                            token:"token____urhfhdvhbhvbhbhbbmn"
                        });
                        //Jwt assigning a token to this specific user
                        // jwt.sign({element}, "secretKey", (err,token)=>{

                        //     if(err) throw error;

                          
                        // });

                       
                    }
                    else {

                        // Email is found but password does not match users input
                        console.log('Password not correct');


                        res.render('forgot_password', {
                            userData: element,
                            result: result,
                            error:'Wrong Password, Forgot your password?'
                        })
                    }

                })


            } else {

                res.render('loggedin_view', {
                    error: 'User with the provided email, not found',
                    result: result
                })
                console.log('No Value found that matches');
            }


        });
    });

});



module.exports = router;