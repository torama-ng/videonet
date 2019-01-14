var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({secret:"_ajjvnjjcbvhbhvLiveNow",resave:false,saveUninitialized:true}));

// Load and call the user collections from the collections folder
const videoData = require('../collections/videos');


const allVideos = require('../randomfilepicker');
var videosSync = [];

videosSync = allVideos.findVideos('videos');

console.log(__dirname);
/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.user){

    
    videosSync.forEach(path=>{

      //var splitPath = path.url.split('/');
      var name = getName(path.url);
  
      console.log(name);

      videoData.findOne({vid_name:name}, (err,doc)=>{
        if(err) throw err;
        if(doc){
          console.log('Video in database');
        }else{
        
         // var id = new Date().toLocaleTimeString() + "_"+new Date().getSeconds() + "Torama"+ new Date().getHours();
          var vid_items = {
            vid_url: path.url,
            vid_name: name,
            vid_views:1,
            vid_uploader:req.session.user.email
        }
  
        var data = new videoData(vid_items);
        data.save();

        }
  
      })

    });

    videoData.find({},(error, doc)=>{
     if(error) throw error;
     
      res.render('recommended', {
        videoTitle: 'Torama Video Portal (index)',
        lessonNumber: 'Lesson 1',
        videoDir: 'Root (videos)',
        videoFiles: doc,
        recommended: doc[1],
        checker:true,
        user: req.session.user
      });

    });
    
  }
  else{

    // res.render('recommended', {
    //   videoTitle: 'Torama Video Portal (index)',
    //   lessonNumber: 'Lesson 1',
    //   videoDir: 'Root (videos)',
    //   videoFiles: videosSync,
    //   recommended: videosSync[3],
    //   checker:false,
    //   user:""    
    // });

    res.redirect('/user/login');
  }

 
});


function getName(txt){
  var url = txt.split('/');
  var name = url[1];
  return name;
}


module.exports = router;

