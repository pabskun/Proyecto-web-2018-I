const express = require('express'),
      router = express.Router(),
      path = require('path');

router.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname + '/../public/index.html'));
});

module.exports = router;