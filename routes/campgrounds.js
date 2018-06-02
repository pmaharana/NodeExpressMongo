const express    = require('express'),
      router     = express.Router(),
      Campground = require('../models/campground'),
      middleware = require('../middleware');

router.get('/', function(req, res) {
  Campground.find({}, function(error, campgrounds) {
    if (error) {
      req.flash('error', 'Could not load data, please contact the help team!');    
    } else {
      res.render('campgrounds/index', {campgrounds: campgrounds});
    }
  }) 
})

router.get('/new', middleware.isLoggedIn, function(req, res) {
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

router.post('/', middleware.isLoggedIn, function(req, res) {
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

router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    res.render('campgrounds/edit', {campground: foundCampground});
  });
})

router.put('/:id', function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updated) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect(`/campgrounds/${updated._id}`);
    }
  });
})

router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/campgrounds');
    } else {
      res.redirect('/campgrounds');
    }
  });
})

module.exports = router;