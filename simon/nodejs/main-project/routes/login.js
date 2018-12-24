const express = require('express');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
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


    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/users_database";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let database = db.db("users_database");
        let collection = database.collection("user_details");

        const encrypted_pass = cryptr.encrypt(user_password);
        console.log("encrypt  password" + encrypted_pass);
        // const decryptedString = cryptr.decrypt(encryptedString);

    
    
        collection.find({ email : user_email}).toArray( function(error, result){

            if (error){
                throw error;
            }else if (result.length){
                result.forEach(function(value){
                    let found_email = value.email;
                    let found_pass = value.user_password;
                    const decrypted_pass = cryptr.decrypt(found_pass);

                    if (decodeURIComponent === user_password){
                        res.render('loggedin_view',{
                           // name : user_email
                        })

                        console.log("decrypt pass : "+decrypted_pass + " user pass"+ user_password);
                        
                    }else{
                        console.log(" wrong password");
                    }


                })
            }else{
                res.render('loggedin_view',{
                   // error : "  User details not found"
                })
            }
        })
         
     
      });
   
   res.render('loggedin_view',);

});




module.exports = router;