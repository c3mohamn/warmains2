var express = require('express');
var router = express.Router();


/* GET Profile page. */
router.get('/:username', ensureAuthenticated, function(req, res, next) {
  res.render('profile', {
    title: 'Profile - ' + req.user.username,
    username: req.user.username
  });
});

// Make sure user is logged in first
function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg', 'You must be logged in first.');
        res.redirect('/');
    }
}

module.exports = router;
