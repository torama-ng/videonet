const express = require('express');
const router = express.Router();
const walk = require('../walk.js');
const {
  ensureAuthenticated
} = require('../config/auth');

let walkSync = [];

router.get('/', (req, res) => {
  res.send('category')
})

router.get('/:name', ensureAuthenticated, function (req, res, next) {
  var dir = `videos/${req.params.name}`;
  walkSync = walk.walkSync(dir);

  console.log(dir);
  console.log(walkSync);

  res.render('view', {
    videoTitle: `${req.params.name} Videos`,
    videoFiles: walkSync,
    videoDir: `${req.params.name}`
  });
});


module.exports = router;