const express = require('express');
let busboy = require('connect-busboy');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();


//  implementation of mongoDB
let mongodb = require('mongodb');

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/', function(req, res,next) {
    res.render( 'registerview');
  
});

router.post('/',function(req,res){
    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/users_database";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var database = db.db("users_database");
        let user_name= req.body.user_name;
        let user_email= req.body.user_email;
        let user_number= req.body.number;
        let user_password= req.body.user_password;
        const encrypted_data = cryptr.encrypt(user_password);
        // const decryptedString = cryptr.decrypt(encryptedString);

        let user_object = {name :user_name, email : user_email, number : user_number, user_password : encrypted_data};
        
        
    

        database.collection("user_details").insertOne(user_object, function(err, res) {
          if (err) throw err;
          console.log(user_object);
        
          console.log("1 user datails inserted to mongodb");
          db.close();
        });
      });
   
   res.render('reg_complete_view');
   console.log(" this is from login.js with reg_complete_view");
});




module.exports = router;