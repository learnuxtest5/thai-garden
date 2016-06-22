$(document).ready(function() {

    Locations.getLocations().then(function(response) {
        console.log("Locations", response);
    });

    Restaurants.getRestaurants(1).then(function(response) {
        console.log("Restaurants", response);
    });

    Menus.getMenu(1).then(function(response) {
        console.log("Menu", response);
    });

    Orders.addItemToOrder(1, 199, 958, 13.95, 1, []);
    sessionStorage.getItem('orderItems');

    Orders.sendOrder().then(function(response) {
        console.log("Order ", response);
        console.log("Order Number", response.orderNumber);
    });
});