const express    = require('express'),
      router     = express.Router({mergeParams: true}),
      Campground = require('../models/campground'),
      Comment    = require('../models/comment');

router.get('/new', isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, data) {
    if (err) console.log(err);
    else {
      res.render('comments/new', {campground: data});
    }
  });
})

router.post('/', isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    }
    else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) console.log(err)
        else {
          //add an user to the comment before pushing dane
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          //
          foundCampground.comments.push(comment);
          foundCampground.save();
          res.redirect('/campgrounds/' + foundCampground._id);
        }
      });
    }
  });
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;