const express = require("express");
const router = express.Router();
const videosJson = require("../videos.json");

// search input
router.get("/", (req, res) => {
  var result = [],
    input,
    videos;

  input = req.query.searchInput;
  videos = videosJson.videos;

  videos.forEach(video => {
    if (video.title.includes(input) || video.category.includes(input)) {
      result.push(video);
    }
  });

  res.render("search", {
    pageTitle: "Search Result",
    searchInput: input,
    searchResult: result,
    videoDir: "videos"
  });
});

module.exports = router;