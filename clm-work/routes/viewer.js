
const express = require('express');
const router = express.Router();
const session = require('express-session');

router.use(session({ secret: "_ajjvnjjcbvhbhvLiveNow", resave: false, saveUninitialized: true }));

router.get('/view/:folder/:name',(req,res,next)=>{

    if(req.session.user){
    var folder = req.params.folder;
    var name = req.params.name;

    var url = "/" + folder + "/" + name;
    console.log("Params - "+url);
    if(url){
        res.render('video_viewer',{
            vid_url:url,
            user:req.session.user
    
        });
    }
}
else{
    res.redirect('/user/login');
}
});


module.exports = router;



