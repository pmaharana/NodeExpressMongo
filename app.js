const express      = require('express'),
      app          = express(),
      bodyParser   = require('body-parser'),
      mongoose     = require('mongoose'),
      Campground   = require('./models/campground'),
      Comment      = require('./models/comment'),
      seedDB       = require('./seeds');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use('/', express.static('lib'));
seedDB();

app.get('/', function(req, res) {
  res.render('landing');
})

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(error, campgrounds) {
    if (error) {
      console.log('lol @ u');    
    } else {
      res.render('campgrounds/index', {campgrounds: campgrounds});
    }
  }) 
})

app.get('/campgrounds/new', function(req, res) {
  res.render('campgrounds/new');
})

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  })
})

app.post('/campgrounds', function(req, res) {
  let newCampground = { name: req.body.name, image: req.body.image, description: req.body.description };
  // createCampground(newCampground);
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

//=========================
//Comment routes
//=========================

app.get('/campgrounds/:id/comments/new', function(req, res) {
  Campground.findById(req.params.id, function(err, data) {
    if (err) console.log(err);
    else {
      res.render('comments/new', {campground: data});
    }
  });
})

app.post('/campgrounds/:id/comments', function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    }
    else {
      Comment.create(req.body.comment, function(err, comment) {
        if (err) console.log(err)
        else {
          foundCampground.comments.push(comment);
          foundCampground.save();
          res.redirect('/campgrounds/' + foundCampground._id);
        }
      });
    }
  });
})

app.listen(3000, function() {
  console.log('Starting the YelpCamp server');
})