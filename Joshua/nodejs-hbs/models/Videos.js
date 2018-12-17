const mongoose = require('mongoose');

const VideoSchema = mongoose.Schema({
  path: String,
  title: String,
  category: String
});

mongoose.model('videos', VideoSchema);