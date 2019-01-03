const express = require('express');
const router = express.Router();
const hbs = require('hbs');

const allVideos = require('../randomFilePicker');
var videosSync = [];

videosSync = allVideos.findVideos('videos');


router.get('/',(req,res,next)=>{
var url = videosSync[1];
    res.render('recommended',{
        videoTitle: 'All Videos',
        videoFiles: videosSync,
        videoDir: 'All Videos',
        recommended: url
    });

});




module.exports = router;