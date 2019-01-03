const express = require('express');
let busboy = require('connect-busboy');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();
const express_validator = require('express-validator');



//  implementation of mongoDB
let mongodb = require('mongodb');

let app = express();



//app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// express validator middleware
app.use(express_validator());


router.get('/', function(req, res,next) {
    res.render( 'user_reg');
   
  
})


 router.post('/', function(req , res , next){
     // check form validation
  req.checkBody('user_name', 'username is required.').notEmpty();
  req.checkBody('user_email', ' Enter a valid email.').isEmail();
  req.checkBody('user_country', 'country is required.').notEmpty();
  req.checkBody('user_password', ' invalid password').isLength({min :4}).equals(req.body.user_password2);

 let errors = req.validationErrors();
  if (errors){
    res.redirect('user_reg');
    req.session.errors = null;
      console.log("error in form "+errors);
    


  }else{
      /// getting user details
      console.log(req.body.password);
    let pass = req.body.user_password;
    console.log(pass);
    const encrypted_data = cryptr.encrypt(pass);
     let user_obj = {
         username : req.body.user_name,
         email : req.body.user_email,
         country : req.body.user_country,
         password : encrypted_data
  
  }

      // const decryptedString = cryptr.decrypt(encryptedString);

      let MongoClient = mongodb.MongoClient;

      let url = "mongodb://localhost:27017/simon_data";
 
      MongoClient.connect(url, function(err, db) {
          if (err) {
              return console.log(err);
          }

  
          // specify the database to use
          let  database = db.db("simon_data");
          
        
           // create a collection if ! exist, and insert data.
        database.collection("user_details").insertOne(user_obj, function(err, res) {
            // if error  ..... throw error
            if (err){
                return console.log(err);
            }
            console.log(user_obj);
            console.log("1 user datails inserted to mongodb");
            db.close();
        
            /*------------------------*////
 });
 res.render('reg_complete_view' , {
    
  });
      
     
    });
}})
      
  

module.exports = router;