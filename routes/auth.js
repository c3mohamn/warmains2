var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

//email used for sending password reset info.
var smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
      user: 'warmains.passreset@gmail.com',
      pass: 'warmains'
  }
});

// /* GET Registration page. */
// router.get('/register', function(req, res) {
//   res.render('register', {title: 'Warmains'});
// });
//
// /* GET Login page. */
// router.get('/login', function(req, res) {
//   res.render('login', {title: 'Warmains'});
// });

/* --------- REGISTER USER ---------
* Registers a new user, adding it to the database in user collection.
*/
router.post('/register', function(req, res){
    //var name = req.body.namefield;
    var username = req.body.username.toLowerCase();
    var password = req.body.password.toLowerCase();
    //var email = req.body.emailfield.toLowerCase();

    // Server side registration validations
    //req.checkBody('namefield', 'Enter a name please.').notEmpty();
    //req.checkBody('namefield',
    //'Invalid characters in name field.').isAlphanumeric();
    req.checkBody('username', 'No username entered.').notEmpty();
    req.checkBody('username',
    'Username must be 3 to 16 characters long.').isLength({min:3, max: 16});
    req.checkBody('password',
    'Password must be 6 to 18 characters long.').isLength({min:6, max: 18});
    //req.checkBody('pass2field', 'Passwords do not match.').equals(password1);
    //req.checkBody('emailfield', 'Invalid Email.').isEmail();

    var errors = req.validationErrors();

    console.log(errors);

    if(errors){
      res.statusMessage = 'Invalid input.';
      res.status(400).end();
    } else {
      // Checking if the username exists already.
      User.getUserByUsername(username, function(err, user) {
          if (err) throw err;
          if (user) {
            console.log(username, ' already exist.');
            res.statusMessage = username + ' already exists.';
            res.status(400).end();
          } else {
            // User name is not taken.
            // Now check if email is taken or not.
            // User.getUserByEmail(email, function(err, user) {
            //   if (err) throw err;
            //   if (user) {
            //     console.log(email, ' already in use.');
            //     req.flash('error_msg', email + ' already in use.');
            //     res.redirect('/users/register');
            //   } else {
            //     // Email and username not taken, proceed with registration.
            //     // Creating a new user with given input.
            //     var newUser = new User({
            //         name: name,
            //         username: username,
            //         password: password1,
            //         email: email
            //     });
            //     newUser.save(function(err) {
            //         console.log(newUser);
            //     });
            //     req.flash('success_msg', 'You are registered ' + username + '!');
            //     res.redirect('/');
            //   }
            //
            // });

            //Creating a new user with given input.
            var newUser = new User({
                name: 'asdad',
                username: username,
                password: password,
                email: '',
                role: 1
            });
            newUser.save(function(err) {
              if (err) throw err;
              console.log(newUser);
            });
            res.statusMessage = username + ' has been created!.';
            res.status(200).end();
          }
      });
    }
});

/* --------- PASSWORD CHANGE ---------
* Changes the logged in users password in the database.
*/
router.post('/changeinfo', function(req, res) {
    var oldpass = req.body.oldpass.toLowerCase();
    var newpass = req.body.newpass.toLowerCase();
    var newpass_confirm = req.body.newpassconfirm.toLowerCase();
    var cur_pass = req.user.password;
    var username = req.user.username;

    // Server side validations to make sure new password is valid.
    req.checkBody('newpass',
    'Enter a new password with at least 6 characters.').isLength({min:6, max: 20});
    req.checkBody('newpassconfirm', 'New passwords do not match.').equals(newpass);

    var errors = req.validationErrors();

    if(errors){
      console.log(errors);
      res.render('profile', {
          errors:errors
      });
    } else {
      // Check if they correctly entered their current password.
      User.comparePassword(oldpass, cur_pass, function(err, isMatch) {
          if(err) throw err;
          if(isMatch) {
              // Change user password and log user out.
              req.user.password = newpass;
              req.user.save(function(err) {});
              req.logout();
              req.flash('error_msg', 'Password Changed.');
              res.redirect('/');
          } else {
              // Incorrectly entered current password, refresh page.
              req.flash('error_msg',
              'The old password you entered is incorrect.');
              res.redirect('/profile/' + username);
          }
      });
    }
});

/* --------- USER LOGIN ---------
* Logs user in after verifying that the user does indeed exist.
* Using passport primarily for this.
*/
passport.use(new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
        if(err) throw err;
        if(!user) {
            return done(null, false, {message: 'Unknown User'});
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            if(err) throw err;
            if(isMatch) {
                console.log("Logged in as " + user.username + ".");
                return done(null, user);
            } else {
                console.log("Invalid Password");
                return done(null, false, {message: 'Invalid password.'});
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

// Logs user in
// Displays flash messages if failure
// redirects to index page.
router.post('/login',
passport.authenticate('local'), function(req, res) {
  console.log(req.user);
  res.send({
    user: req.user.username,
    name: req.user.name,
    role: req.user.role,
    email: req.user.email,
    message: req.message,
  });
});

/* --------- LOGOUT --------- */
router.get('/logout', function(req, res, user) {
    req.logout();
    req.flash('success_msg', 'You have logged out.');
    res.redirect('/');
});

/* --------- GET Forgot Password page. --------- */
router.get('/forgot', function(req, res) {
  res.render('forgot');
});

/* Directed here after clicking Reset Password on forgot page.
*  Sends an email to the user with a link and a 'token' that can be used to
*  reset their password.
 */
router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      // Verify that the email address is entered correctly.
      User.findOne({ email: req.body.forgotemail }, function(err, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/users/forgot');
        }
        user.resetPasswordToken = token;
        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var mailOptions = {
        to: user.email,
        from: 'warmains.passreset@gmail.com',
        subject: 'Warmains Password Reset',
        text: 'You are receiving this because you (or someone else) have ' +
          'requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your ' +
          'browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/users/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your ' +
          'password will remain unchanged.\n'
      };
      // Sends the mail to the user's email.
      smtpTransport.sendMail(mailOptions, function(err) {
        req.flash('info', 'An e-mail has been sent to ' + user.email +
                  ' with further instructions.');
        done(err, 'done');
      });
      console.log("Token sent to user's mail.")
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/');
  });
});

/* --------- GET Reset Passowrd page. ---------
* Renders the reset password page if the user's token is valid / exists.
*/
router.get('/reset/:token', function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/users/forgot');
    }
    res.render('reset', {
      user: req.user
    });
  });
});

// Directed here after user enters reset password information.
router.post('/reset/:token', function(req, res) {
  async.waterfall([
    function(done) {
      // Checking if the token is valid.
      User.findOne({ resetPasswordToken: req.params.token }, function(err, user) {
        if (!user) {
            console.log("Password token invalid/expired: " + req.body.resetpass1);
            req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        // Making sure that the new passwords are valid.
        req.checkBody('resetpass1',
        'Enter a password with more than 6 characters.').isLength({min:6, max: 20});
        req.checkBody('resetpass2',
        'Passwords do not match.').equals(req.body.resetpass1);

        var errors = req.validationErrors();

        if(errors){
            console.log(errors);
            res.render('reset', {
                errors:errors
            });
        } else {
            // Setting and saving the new passwords for the user.
            user.password = req.body.resetpass1;
            user.resetPasswordToken = undefined;
            user.save(function(err) {
                done(err, user);
            });
            console.log("Password reset to: " + req.body.resetpass1);
        }
      });
  },
  // Notifying user via mail that their password has been reset.
  function(user, done) {
    var mailOptions = {
      to: user.email,
      from: 'warmains.passreset@gmail.com',
      subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' +
        user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      req.flash('success', 'Success! Your password has been changed.');
      done(err);
    });
  }
  ], function(err) {
    res.redirect('/');
  });
});

/* Get all the users in the database. */
router.get("/AllUser/", function(req, res) {
  console.log("Getting All Users.");
  User.find({},
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
