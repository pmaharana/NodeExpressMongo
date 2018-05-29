const express    = require('express'),
      router     = express.Router(),
      Campground = require('../models/campground');

router.get('/', function(req, res) {
  Campground.find({}, function(error, campgrounds) {
    if (error) {
      console.log('lol @ u');    
    } else {
      res.render('campgrounds/index', {campgrounds: campgrounds});
    }
  }) 
})

router.get('/new', isLoggedIn, function(req, res) {
  res.render('campgrounds/new');
})

router.get('/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  })
})

router.post('/', isLoggedIn, function(req, res) {
  let author = {id: req.user._id, username: req.user.username};
  let newCampground = { 
    name: req.body.name, 
    image: req.body.image, 
    description: req.body.description,
    author: author
   };
  
  Campground.create(newCampground, function(err, created) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    }
    else {
      res.redirect('/campgrounds/' + created._id);
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