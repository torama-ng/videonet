const express = require('express');
var busboy = require('connect-busboy');
var bodyParser = require('body-parser');
const router = express.Router();
//  implementation of mongoDB
let mongodb = require('mongodb');
//let mongoose = require('mongoose');

//let db = mongojs('userDB', ['userDetails']);


router.get('/', function(req, res,next) {
    // db.usersDetails.find(function(err, docs){
    //     console.log("mongoDB connection successful ");
       
    //     console.log(" error in application  "+ err);

    var MongoClient = mongodb.MongoClient;

    var url = "mongodb://localhost:27017/userDB";

    MongoClient.connect(url, (error,db) =>{
        if(error) throw error;

        console.log('Connected to mongo');

        var dbo = db.db('userDB');

        var collection = dbo.collection('userDetails');

        collection.find({}).toArray(function(err,result){
                if(err) throw err;

                else if(result.length){
                    console.log(result);
                }
        });
        db.close();

    })

  
});



module.exports = router;