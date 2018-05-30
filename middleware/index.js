const Campground  = require('../models/campground'),
      Comment     = require('../models/comment');

const middleware = {

  checkCampgroundOwnership: function(req, res, next) {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id, function(err, foundCampground) {
        if (err) {
          res.redirect('back');
        }
        else {
          if (foundCampground.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });  
    } else {
      res.redirect('back');
    }
  },

  checkCommentOwnership: function(req, res, next) {
    if (req.isAuthenticated()) {
      Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
          res.redirect('back');
        }
        else {
          if (foundComment.author.id.equals(req.user._id)) {
            next();
          } else {
            res.redirect('back');
          }
        }
      });  
    } else {
      res.redirect('back');
    }
  },

  isLoggedIn: function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error', 'Please login first');
    res.redirect('/login');
  }
};

module.exports = middleware;