var express = require("express");
var router = express.Router();
// const walk = require('../walk.js');
// const fs = require('fs');
const videosJson = require("../videos.json");

// var allVideos = [];
// allVideos = walk.videoSync('videos');

let videos,
  input,
  error,
  result = [];

// search input
router.post("/", (req, res) => {
  input = req.body.searchInput;
  videos = videosJson.videos;

  videos.forEach(video => {
    if (video.title.includes(input) || video.category.includes(input)) {
      console.log(video);
      result.push(video);
    } else {
      error = "No result found!";
    }
  });

  // {
  //   pageTitle: "Search Result",
  //   error: error,
  //   videoDir: "videos"
  // }

  if (error) {
    res.redirect("search");
  } else {
    res.render("search", {
      pageTitle: "Search Result",
      searchInput: input,
      searchResult: result,
      videoDir: "videos"
    });
  }
});

module.exports = router;