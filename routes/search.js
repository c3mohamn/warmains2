var express = require('express');
var router = express.Router();
var Char = require('../models/char');

/* GET Search page. */
router.get('/', function(req, res, next) {
  res.render('search', {title: 'Warmains - Search'});
})

/* Get all the users in the database. */
router.get("/findChars/", function(req, res) {
  console.log("Getting All Matching Characters.");

  var search = req.query.search.toLowerCase();
  search = RegExp(search);

  // search for name, user, class or spec
  Char.find({ $or: [{name: search}, {username: search}, {class: search}, {spec: search}]},
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).send();
      }
      res.send(result);
      return res.status(200);
    });
});

module.exports = router;
