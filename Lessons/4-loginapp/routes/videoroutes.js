const express = require('express');
const router = express.Router();

//  Models
const Video = require('../models/videoschema');

// @route GET api/videos
// @desc Get All videos
// @access Public

router.get('/',function(req,res) {
    console.log('Get Videos');
    Video.getVideos(function(err,videos){
        if (err) throw err;
      //  res.json(videos);
        res.render('view2', { 
            
            videos: videos,
            
        });


    });    
});

// @route GET api/video
// @desc Get a video
// @access Public

router.get('/:_id',function(req,res) {
    id = req.params._id;
    console.log('Get Video by ID');

    Video.getVideoById(id,function(err,video){
        if (err) res.status(404).send('May be wrong id');
        res.json(video);


    });
    
});

// @route POST api/video
// @desc  Add a video
// @access Public
router.post('/',function(req,res) {
    var video = req.body;
    Video.addVideo(video, function(err,video){
        if (err) res.status(404).send("Problem adding video");
        res.send(video);
    })
/*
    const newItem = new Item({
        name: req.body.name,
        filename: filename,
        author: req.body.author,
        authorlink: req.body.authorlink,
        description: req.body.description,
        category: req.body.category,
        
    });


    newItem.save()
    .then(item => res.json(item))
    .catch(err =>res.status(500).send("Error saving to Database")); 
    */
});

// @route UPDATE api/videos/:id
// @desc Update a video
// @access Public
router.put('/:_id',function(req,res) {
    var id = req.params._id;
    var video = req.body;
    Video.updateVideo(id,video,{},function(err,video){
        if (err) res.status(500).send("Update video error");
        res.json(video);
    })

})

// @route DELETE api/videos/:id
// @desc  Delete an item
// @access Public
router.delete('/:_id',function(req,res) {
    var id = req.params._id;
    Video.removeVideo(id,function(err,video){
        if (err) res.status(500).send('delete video failed');
        res.json(video);

    })
});

module.exports = router;