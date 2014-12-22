var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

var cradle = require('cradle');

var app = express();

app.use(allowCrossDomain);

var FlightProvider = require('./flight').FlightProvider;
var flightProvider= new FlightProvider();

var ReservationProvider = require('./reservation').ReservationProvider;
var reservationProvider= new ReservationProvider();

app.get('/flight/all', function(req, res){
    flightProvider.findAll(function(error, docs){
        console.log(error);
        res.json(docs);
    });
});

app.get('/flight/clear', function(req, res) {
    flightProvider.delete(function(err, docs) {
        res.json(docs);
    });
});

app.get('/flight/add', function(req, res){
    var tickets = [
        {
            id: 'GA1213',
            flight: 'Garuda Indonesia',
            route: 'Jakarta -> Surabaya',
            image: 'img/plane1.jpg'
        },
        {
            id: 'LI232',
            flight: 'Lion Air',
            route: 'Jakarta -> Denpasar',
            image: 'img/plane2.jpg'
        },
        {
            id: 'SU214',
            flight: 'Susi Air',
            route: 'Denpasar -> Makassar',
            image: 'img/plane3.jpg'
        },
        {
            id: 'SR121',
            flight: 'Sriwijaya Airline',
            route: 'Makassar -> Jayapura',
            image: 'img/plane4.jpg'
        }
    ];
    flightProvider.save(tickets, function(err, docs) {
        res.json(docs);
    });
});

app.get('/reservation/all', function(req, res) {
    reservationProvider.findAll(function(error, docs){
        res.json(docs);
    });
});

app.post('/reservation/create', function(req, res) {
    // var data = req.query;
    // console.log(req.body.data);
    res.json(req.body);
    // reservationProvider.save(data, function(error, docs) {
    //     res.json(docs);
    // });
});

app.listen(3001);

