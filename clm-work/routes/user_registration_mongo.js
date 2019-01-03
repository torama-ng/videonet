const express = require('express');
var fileUpload = require('express-fileupload');
const router = express.Router();
const fs = require('fs');
const mongo_client = require('mongodb').MongoClient;
const session = require('express-session');


router.use(session({secret:"_ajjvnjjcbvhbhvLiveNow",resave:false,saveUninitialized:true}));

// Encryption 
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

// DB constants 
const url = "mongodb://localhost:27017/Toramadb";
const _databasename = "Toramadb";
const _collectionname = "torama_users";

// mkdir if not exits
const mkdirSync = function (dirPath) {
    try {
        fs.mkdirSync(dirPath)
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }
}

router.use(fileUpload());

router.get('/', function (req, response, next) {
    if(req.session.user){
        response.render("already_logged_in",{
            userData: req.session.user
        });
      }else{
        response.render('user_registration_mongo', {
            regText: 'Register Now'
        });
      }
    
});


/*
Listening for post request 
*/
router.post('/', (req, res, next) => {
    var username = req.body.username;
    var phone = req.body.phone;
    var email = req.body.email;
    var password = req.body.password;

    req.checkBody('name','name is required').notEmpty();

    if (req.files) {

        var profilepic = req.files.file, filename = profilepic.name;
        console.log(username + ", " + password);

        //Make the dir if not exists
        mkdirSync("profile_pics/user_images/");
        var userImage = "user_images/" + filename;

        mongo_client.connect(url, (error, db) => {
            if (error) throw error;
            console.log('Connection Established to Mongo');

            var dbo = db.db(_databasename);

            //First check if the collection already exists before creating it
            dbo.listCollections({ name: _collectionname }).next((error, collInfo) => {

                if (error) throw error;

                else if (collInfo) {
                    console.log('Collection exists');

                    const encryptedPword = cryptr.encrypt(password);
                    var obj = { name: username, email: email, password: encryptedPword, phone: phone, image: userImage };
                    dbo.collection(_collectionname).insertOne(obj, (inserterr, result) => {
                        if (inserterr) throw inserterr;
                        console.log('user inserted ' + result);

                        profilepic.mv("profile_pics/"+userImage, (error)=>{

                            if(error) throw error;
                            res.render('signedup_view', {
                                username: username,
                                password: password,
                                image: userImage
                            })
                        });
                       
                    });
                } else {

                    console.log('Collection does not exists');
                    
                    const encryptedPword = cryptr.encrypt(password);
                    var obj = { name: username, email: email, password: encryptedPword, phone: phone, image: userImage };
                    dbo.collection(_collectionname).insertOne(obj,function(error,result){

                        if(error) throw error;
                        else if(result){
                            console.log(result);
                            console.log('user inserted ' + result);

                            res.render('signedup_view', {
                                username: username,
                                password: password,
                                image: userImage
                            });
                        }
                    });

                }
                db.close();
            });


        });
    } else {
        console.log('not file');
    }

});




//Verify User Token
function VerifyToken(req,res,next){

    // Get Auth Haeder value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        /*
            Since our Header Token contains a bearer <token>, we have to split it
        */
        const header = bearerHeader.split(' ');
        // After splitting it, header is now an array of strings
        const bearerToken = header[1];

        req.token = bearerToken;
        next();

    }else{
        res.sendStatus(403);
    }
}

module.exports = router;