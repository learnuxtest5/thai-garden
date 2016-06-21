var express = require('express');
var bodyParser = require('body-parser')
var fs = require("fs");
var app = express();
app.use(bodyParser.json());

app.get('/locations', function(request, response) {
    fs.readFile(__dirname + "/data/locations.json", 'utf8', function(err, data) {
        console.log("Locations:", data);
        response.end(data);
    });
});

app.get('/locations/:id', function(request, response) {
    if (request.params.id == 1) {
        fs.readFile(__dirname + "/data/restaurants.json", 'utf8', function(err, data) {
            console.log("Locations:", data);
            response.end(data);
        });
    } else {
        response.status(404).send('Not found');
    }
});

app.get('/restaurants/:id', function(request, response) {
    fs.readFile(__dirname + "/data/restaurants.json", 'utf8', function(err, data) {
        console.log("Restaurants:", data);
        var restaurants = [];
        data = JSON.parse(data);
        
        for (var d = 0, len = data.length; d < len; d += 1) {
            console.log(data[d].locationId + " " + request.params.id);
            if (data[d].locationId == request.params.id) {
                restaurants.push(data[d]);
            }
        }
        console.log(JSON.stringify(restaurants));
        if(restaurants.length > 0) {
            response.end(JSON.stringify(restaurants));
        }
        else{
            response.status(404)
                .send('Not found');
        }
    });
});

/*app.get('/order', function(request, response) {
    fs.readFile(__dirname + "/data/order/json", 'utf8', function(err, data) {
        console.log("Order", data);
        response.end(data);
    });
});*/

app.post('/orders', function(request, response) {
    var newOrder = request.body;
    fs.readFile(__dirname + "/data/orders.json", 'utf8', function(err, data) {
        data = JSON.parse(data);
        data.push(newOrder);
        response.end(JSON.stringify(data));

        fs.writeFile(__dirname + "/data/orders.json", JSON.stringify(data), function(err) {
            if(err) {
                return console.error(err);
            }
        });
    });
});

app.listen(8081, function() {
    console.log("Express listening on port 8081...");
});