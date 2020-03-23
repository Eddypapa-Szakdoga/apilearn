var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Car = require('./app/models/cars');

// Configure app for BP
// lets us grab data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set listen port for the server
var port = process.env.PORT || 3000;

// Connect to DB with parameters
mongoose.connect('mongodb://127.0.0.1:27017/codealong', {useNewUrlParser: true, useUnifiedTopology: true});

//API Routes
var router = express.Router();

// Routes with prefix
app.use('/api', router);

// MIDDLEWARE -
router.use(function(req, res, next) {
    console.log('Things happened...');
    next();
});

//Test Route
router.get('/', function(req, res) {
    res.json({message: "Welcome to our API"});
});

router.route('/cars')

    .post(function(req, res) {
        var car = new Car(); // new car
        car.make = req.body.make;
        car.model = req.body.model;
        car.color = req.body.color;

        car.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Car was successfully'});
        });
    })

    .get(function(req, res) {
        Car.find(function(err, cars) {
            if (err) {
                res.send(err);
            }
            res.json(cars);
        });
    });

router.route('/car/:car_id')
    .get(function(req, res) {
        Car.findById(req.params.car_id, function(err, car) {
            if (err) {
                res.send(err);
            }
            res.json(car);
        });
    });

    router.route('/car/make/:make')
    .get(function(req, res) {
        Car.find({make:req.params.make}, function(err, car) {
            if (err) {
                res.send(err);
            }
            res.json(car);
        });
    });

    router.route('/car/color/:color')
    .get(function(req, res) {
        Car.find({color:req.params.color}, function(err, car) {
            if (err) {
                res.send(err);
            }
            res.json(car);
        });
    });

// Fire up server
app.listen(port);
// Start message
console.log('Server listening on port ' + port);
