var express = require('express');
var router = express.Router();
var Talent = require('../models/talent');

router.get('/savedTalents', function(req, res) {
  //Talent.find
  //TODO: Find and return all saved talents belonging to user
});

module.exports = router;
