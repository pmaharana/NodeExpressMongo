const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

const data = [
  {
    name: 'Cid\'s Tiny Bronco Spot', 
    image: 'https://www.rockpapershotgun.com/images/12/jul/ff71.jpg',
    description: 'Cornish pasty ear hole challenge you to a duel, doing my nut in what a mug up at the crack of dawn, absolute twoddle. Scouser conked him one on the nose down South, one feels that. Tally-ho a right royal knees up good old fashioned knees up bloke collywobbles scouser, gobsmacked clock round the earhole I could reet fancy a rather football, Dalek manky warts and all a bit wonky. Northeners every fortnight cottage pie have a gander, chuffed have a bash. Black cab ey up chuck ee bah gum well chuffed lass a total jessie what a mug old chap, marmite knee high to a grasshopper i\'ll be a monkey\'s uncle alright duck up at the crack of dawn absobloodylootely have a gander morris dancers complete mare, the old bill therewith upper class I could reet fancy a tip-top ear hole.'
  },
  {
    name: 'Temporal Vortex', 
    image: 'https://vignette.wikia.nocookie.net/chrono/images/4/48/TVortex.png/revision/latest?cb=20090806045023',
    description: 'And scrote bogroll who brought loaf a reet bobbydazzler, they can sod off blighty punter Elementary my dear Watson completely starkers, loo blimey gobsmacked. Conked him one on the nose Weeping Angels morris dancers well fit, the black death bovver boots, round our gaff stew and dumps. Two weeks on\'t trot off t\'shop twiglets throw a spanner in the works queer as a clockwork orange shortbread conkers, naff bow ties are cool for sooth \'tis a reet bobbydazzler taking the mick, down the local fancy a cuppa the fuzz bit of alright make a brew. Wibbly-wobbly timey-wimey stuff scrumpy squirrel therewith narky fancied a flutter doofer completely crackers, a cracking River Song a cracking mush a reet bobbydazzler curtain twitching, a cuppa snotty nosed brat curtain twitching scarper chuffed well chuffed.'
  },
  {
    name: 'Evil Forest Tree Spot', 
    image: 'http://shrines.rpgclassics.com/psx/ffix/Pics/Image604.jpg',
    description: 'Through the dales pompous Weeping Angels drizzle absolute twoddle slappers, well chuffed ear hole blummin\' a reet bobbydazzler Elementary my dear Watson, not some sort of dosshouse air one\'s dirty linen yorkshire pudding \'tis. Guinness grub\'s up one would be honoured to pikey superb, working class hedgehog ponce Shakespeare pigeons in Trafalgar Square, ey up chuck slap-head utter shambles. Lost her marbles laughing gear posh nosh because there was nothing on the gogglebox Sherlock, wedding tackle balderdash penny-dreadful a fiver hadn\'t done it in donkey\'s years the old bill, two weeks on\'t trot gobsmacked terribly. Slappers alright geezer jolly Doctor Who the lakes on\'t goggle box alright geezer down South the lakes, crisps cup of tea doing my nut in down the local ee bah gum knackered nonsense.'
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