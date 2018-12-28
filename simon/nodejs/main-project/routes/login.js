const express = require('express');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const mongoose = require('mongoose');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();


//  implementation of mongoDB
let mongodb = require('mongodb');

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/', function(req, res,next) {
    res.render( 'login_view');
  
});




router.post('/',function(req,res){

    let user_email= req.body.user_email;
    let user_password= req.body.user_password;
    console.log(user_email, user_password)


    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/simon_data";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let database = db.db("simon_data");
        let collection = database.collection("user_details");

        const encrypted_pass = cryptr.encrypt(user_password);
        console.log("encrypt  password" + encrypted_pass);
        // const decryptedString = cryptr.decrypt(encryptedString);

    
    
        collection.find({ email : user_email, }).toArray( function(error, result){
            console.log('hi', result, error)
            if (error){
                throw error;
            }else if (result.length){
                console.log('i am here')
                result.forEach(function(value){
                    console.log('a user')
                    let found_email = value.email;
                    let found_pass = value.password;
                    const decrypted_pass = cryptr.decrypt(found_pass);
                    
                    console.log("decrypt pass : "+decrypted_pass + " user pass"+ user_password);
                        

                    if (decrypted_pass === user_password){
                        res.render('loggedin_view',{
                           // name : user_email
                        })

                    }else{
                        res.render('loggedinfail_view',{
                            // error : "  User details not found"
                        })
                        console.log(" wrong password");
                    }


                })
            }else{
                res.render('loggedinfail_view',{
                   // error : "  User details not found"
                })
            }
        })
         
     
      });

});




module.exports = router;