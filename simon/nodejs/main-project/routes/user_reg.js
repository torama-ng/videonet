const express = require('express');
let busboy = require('connect-busboy');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');


//  implementation of mongoDB
let mongodb = require('mongodb');

let app = express();
//app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


router.get('/', function(req, res,next) {
    res.render( 'user_reg');
  
})

 router.post('/', function(req , res , next){
    const errors = validationResult(req);
// getting user details 
    let username= req.body.user_name;
    let user_email= req.body.user_email;
    let user_country = req.body.user_country;
    let  pass = req.body.user_password;
    const encrypted_data = cryptr.encrypt(pass);
      // const decryptedString = cryptr.decrypt(encryptedString);

      let MongoClient = mongodb.MongoClient;

      let url = "mongodb://localhost:27017/simon_data";
 
      MongoClient.connect(url, function(err, db) {
          if (err) {
              return console.log(err);
          }

  
          // specify the database to use
          let  database = db.db("simon_data");
          
        // passing user object 
        let user_object = {username :username, email : user_email, country : user_country, password : encrypted_data};
        
           // create a collection if ! exist, and insert data.
        database.collection("user_details").insertOne(user_object, function(err, res) {
            // if error  ..... throw error
            if (err){
                return console.log(err);
            }
            console.log(user_object);
            console.log("1 user datails inserted to mongodb");
            db.close();



        
            /*------------------------*////
 })

      });
      res.render('reg_complete_view' , {
      
      });
    })

      


module.exports = router;