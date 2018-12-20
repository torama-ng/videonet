const express = require('express');
const bodyParser = require('body-parser');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const router = express.Router();



let mongodb = require('mongodb');

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/', function(req, res,next) {
    res.render( 'reg_form_view', {
        message : 'please login your credentials '
    });
  
});



router.post('/',function(req,res){

    let mail = req.body.user_email
    let pass = req.body.user_password;

        //const encrypted_data = cryptr.encrypt(user_password);
        const decryptedString = cryptr.decrypt(user_password);
        //show user password 
      



        
    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/users_database";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        // specify used database
        let  database = db.db("users_database");

       let data_colections = database.collection("user_details");

        data_colections.find({user_email:user_email}).toArray( function(err, result){
            if (err) throw err;
            else if (result.length){
                result.forEach(file =>{
                    let found_email = file.user_email;
                    let found_pass = file.user_password;

                    let decryptpass = cryptr.decrypt(found_pass);
                    if (decryptpass === pass && mail === found_email){
                        res.render("loged_in_view", {
                            user_details : file,
                            result : result,
                        })
                    }else{
                        console.log("user not recognized");
                    }
                })
            }else{
                res.render("logrd_in_view", {
                    data_error : " provided user not found",
                    result:result
                })
            }
        }) 

          console.log(user_object);
        
          // log result if no error
          console.log("1 user datails inserted to mongodb");
          db.close();
        });
      });
   
    
   





module.exports = router;