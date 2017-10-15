var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

//email used for sending password reset info.
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'warmains.passreset@gmail.com',
      pass: 'warmains'
  }
});

/* GET Index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Warmains' });
});

module.exports = router;
