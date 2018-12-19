const express = require('express');
let busboy = require('connect-busboy');
const bodyParser = require('body-parser');
const router = express.Router();
//  implementation of mongoDB
let mongodb = require('mongodb');

let app = express();

app.use(bodyParser.urlencoded({extended:true}));

router.get('/', function(req, res,next) {


    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/userDB";

    MongoClient.connect(url, (error,db) =>{
        if(error) throw error;

        console.log('connection to mongodb successful');

        let dbo = db.db('userDB');

        let collection = dbo.collection('userDetails');
    

        collection.find({}).toArray(function(err,result){
                if(err) throw "error whille inserting data: "+err;

                else if(result.length){
                    console.log(result);
                }
        });
       
        db.close();
    })
    res.render( 'registerview');
  
});

router.post('/',function(req,res){
    let MongoClient = mongodb.MongoClient;

    let url = "mongodb://localhost:27017/toramaUserLogin";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("toramaUserLogi");
        let myData = req.body;
        dbo.collection("userDetails").insertOne(myData, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    //console.log(myData);
   res.render('registerview');
});




module.exports = router;