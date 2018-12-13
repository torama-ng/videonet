const express = require("express");
const fs = require("fs");
const walk = require("../walk.js");
const walkSync = walk.walkSync("videos");
const router = express.Router();

let allVideos = [];
allVideos = walk.videoSync("videos");


/* GET home page. */
router.get("/", function (req, res, next) {
  // adding videos to JSON db
  fs.readFile("./videos.json", function (err, data) {
    if (err) throw err;

    let videoList = JSON.parse(data);
    var videoArray = videoList.videos;

    if (videoArray.length == 0) {
      allVideos.forEach(file => {
        videoArray.push(file);
      })

      fs.writeFile("./videos.json", JSON.stringify(videoList), "utf-8", function (
        err
      ) {
        if (err) throw err;
        console.log("Done!");
      });
    } else if (videoArray.length <= allVideos.length || videoArray.length > allVideos.length) {
      fileList = {
        videos: []
      };

      allVideos.forEach(element => {
        fileList.videos.push(element);
      });

      fs.writeFile('./videos.json', JSON.stringify(fileList), function (error) {
        if (error) throw error;
        console.log('Updated!');
      });
    }
  });

  res.render("index", {
    videoTitle: "Torama Video Portal (index)",
    lessonNumber: "Lesson 1",
    videoDir: "Root (videos)",
    videoFiles: walkSync
  });
});

module.exports = router;