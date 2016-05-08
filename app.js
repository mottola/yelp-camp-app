var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose'),
    Campground      = require("./models/campground");

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extened: true}));
app.set('view engine', 'ejs');


// Campground.create(
//     {
//       name: 'Granite Hill', 
//       image: 'https://images.unsplash.com/photo-1455496231601-e6195da1f841?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=77f409d4c8c4ac33fce690d51533f206',
//       description: 'This is a huge granite hill, no bathrooms. No water. Beautiful granite!'
//     }, function(err, campground) {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log('Newly Created Campground');
//             console.log(campground);
//         }
    
//     });

app.get('/', function(req, res){
    res.render('landing');
});

// INDEX ROUTE - show all campgrounds
app.get('/campgrounds', function(req, res) {
    Campground.find({}, function(err, allCampgrounds) {
        if(err){
            console.log(err);
        }else {
            res.render('index', {campgrounds: allCampgrounds});
        }
    });
});

// CREATE ROUTE - add new campground
app.post('campgrounds', function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log('Error');
        } else {
            res.redirect('/campgrounds');
        }
    });
});

// NEW ROUTE - show form to create new campground
app.get('/campgrounds/new', function(req, res) {
   res.render('new.ejs'); 
});

// This must be at the bottom!
app.get('/campgrounds/:id', function(req, res) {
    Campground.findByID(req.params.id, function(err, foundCampground) {
        if(err) {
            console.log(err);
        } else {
            res.render('show', {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('YelpCamp Server is Online!!');
});