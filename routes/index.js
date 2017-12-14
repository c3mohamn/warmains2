var express = require('express');
var router = express.Router();

/* GET Index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Warmains' });
});

module.exports = router;
