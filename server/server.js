var express = require('express');
var bodyParser = require('body-parser')
var fs = require("fs");
var app = express();
app.use(bodyParser.json());

// GET a list of locations
app.get('/locations', function (request, response) {
    fs.readFile(__dirname + "/data/locations.json", 'utf8', function (err, data) {
        response.end(data);
    });
});

// GET a list of restaurants in a particular location
app.get('/locations/:id', function (request, response) {
   fs.readFile(__dirname + "/data/restaurants.json", 'utf8', function (err, data) {
        var locationId = request.params.id;
        data = JSON.parse(data);

        var suitableRestaurants = [];
        for (var i = 0; i < data.length; i++) {
            if (data[i].locationId == locationId) {
                suitableRestaurants.push(data[i]);
            }
        }
        response.end(JSON.stringify(suitableRestaurants));
    });
});

// GET a menu for a particular restaurant
app.get('/restaurants/:id', function (request, response) {
    if (request.params.id == 1) {
        fs.readFile(__dirname + "/data/littleKitchenMenu.json", 'utf8', function (err, data) {
            data = JSON.parse(data).RestaurantMenuCategories;
            response.end(JSON.stringify(data));
        });
    } else {
        res.status(404).send('Not found');
    }
});

// POST an order
app.post('/orders', function (request, response) {
    fs.readFile(__dirname + "/data/orders.json", 'utf8', function (err, data) {
        data = JSON.parse(data);

        var newOrder = request.body;
        newOrder.orderNumber = data.length + 1;

        data.push(newOrder);

        fs.writeFile(__dirname + "/data/orders.json", JSON.stringify(data), function (err) {
            if (err) {
                return console.error(err);
            }
        });

        response.end(JSON.stringify(newOrder));
    });
});

app.use(express.static(__dirname + '/public'));

app.listen(8081, function () {
    console.log("Express listening on port 8081...");
});