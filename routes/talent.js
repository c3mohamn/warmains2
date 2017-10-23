var express = require('express');
var router = express.Router();
var Talent = require('../models/talent');

// Save talent
router.post('/save', function(req, res) {
  var talent = {
    username: req.body.username || null,
    name: req.body.name || null,
    classId: parseInt(req.body.classId) || 0,
    talents: req.body.talents || null,
    glyphs: req.body.glyphs || null,
    preview: req.body.preview || null,
  };

  // Error checking talent fields
  req.checkBody('name',
  'Name must be between 2 and 20 characters long.').isLength({min:2, max:20});
  req.checkBody('classId',
  'Invalid classId.').isInt();
  req.checkBody('talents',
  'Invalid talents.').isLength({min:0, max:100});
  req.checkBody('glyphs',
  'Invalid glyphs.').isLength({min:0, max:50});

  var errors = req.validationErrors();

  if (errors) {
    console.log(errors);
    res.statusMessage = 'Invalid input.';
    res.status(400).send(errors);
  } else {
    Talent.find({username: talent.username, name: talent.name},
      function (err, result) {
        if (err) throw err;

        // Talent already exists
        if (result.length > 0) {
          res.statusMessage = 'Talent ' + talent.name + ' already exists.';
          res.status(400).send();
        } else {
          // Create new talent
          var newTalent = new Talent({
            username: talent.username,
            name: talent.name,
            classId: talent.classId,
            talents: talent.talents,
            glyphs: talent.glyphs,
            preview: talent.preview
          });

          Talent.saveTalent(newTalent, function(err, talent) {
              if(err) throw err;
              console.log(talent);
          });

          res.status(200).send({data: talent});
        }
      });
  }
});

// Get talent by username
router.get('/get', function(req, res) {
  Talent.find({username: req.query.username},
    function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send();
      }

      res.status(200).send({talents: result});
    });
});

// Delete talent by id
router.post('/delete', function(req, res) {
  Talent.findOneAndRemove({_id: req.body.id}, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    }
      res.statusMessage = 'Talent ' + req.body.name + ' has been deleted.';
      res.status(200).send();
  });
});

module.exports = router;
