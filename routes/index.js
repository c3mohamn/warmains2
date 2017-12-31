var express = require('express');
var router = express.Router();

// Since routes all done with AngularJS Ui-router
// Serve the base index.jade file for any route
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Warmains' });
});

module.exports = router;
