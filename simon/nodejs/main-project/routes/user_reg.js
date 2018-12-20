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
    res.render( 'reg_form_view', {
        message : 'please login your credentials '
    });
  
});



router.post('/',function(req,res){

    let user_name= req.body.user_name;
        let user_email= req.body.user_email;
        let user_number= req.body.number;
        let user_password= req.body.user_password;
        const encrypted_data = cryptr.encrypt(user_password);
          // const decryptedString = cryptr.decrypt(encryptedString);


        
    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/users_database";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        // specify the database to use
        let  database = db.db("users_database");
        
      

        // passing user object 
        let user_object = {name :user_name, email : user_email, number : user_number, user_password : encrypted_data};
        
        // create a collection if ! exist, and insert data.
        database.collection("user_details").insertOne(user_object, function(err, res) {
            // if error  ..... throw error
          if (err) throw err;

          // log stored object
          console.log(user_object);
        
          // log result if no error
          console.log("1 user datails inserted to mongodb");
          db.close();
        });
      });
   
      // render registration message, page and username
   res.render('reg_complete_view', {
    user_name :user_name ,
   });
   
});




module.exports = router;