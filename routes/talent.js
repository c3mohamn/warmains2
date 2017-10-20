var express = require('express');
var router = express.Router();
var Talent = require('../models/talent');

// Find saved talents for user
router.get("/getSaved", function(req, res) {
  Char.find({username: req.query.username},
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      res.status(200).send({data: result});
      return res.status(200);
    });
});

// Delete talent

// Save talent

module.exports = router;
