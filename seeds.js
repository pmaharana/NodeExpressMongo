const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Cid\'s Tiny Bronco Spot', 
    image: 'https://www.rockpapershotgun.com/images/12/jul/ff71.jpg',
    description: 'Outskirts of Rocket town...'
  },
  {
    name: 'Temporal Vortex', 
    image: 'https://vignette.wikia.nocookie.net/chrono/images/4/48/TVortex.png/revision/latest?cb=20090806045023',
    description: 'A link to different dimensions'
  },
  {
    name: 'Evil Forest Tree Spot', 
    image: 'http://shrines.rpgclassics.com/psx/ffix/Pics/Image604.jpg',
    description: 'Freakin evil plants!'
  },
];

function seedDB() {
  //Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) console.log(err);
    else {
      Comment.remove({}, function(err) {
        if (err) console.log(err);
        else {
          data.forEach(function(seed) {
            Campground.create(seed, function(err, campground) {
              if(err) console.log(err);
              else {
                //create comment
                Comment.create(
                  {
                    text: 'This place is great, but I wish there was internet',
                    author: 'Bob'
                  }, function(err, comment) {
                    if (err) console.log(err)
                    else {
                      campground.comments.push(comment);
                      campground.save();
                    }              
                  }
                )
              }
            });
          });
        }
      })
    }
  });
}

module.exports = seedDB;