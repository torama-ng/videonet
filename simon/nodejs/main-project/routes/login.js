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






module.exports = router;