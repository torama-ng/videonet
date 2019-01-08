const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  path: String,
  title: String,
  category: String
});

const Videos = mongoose.model('videos', VideoSchema);


module.exports = Videos;