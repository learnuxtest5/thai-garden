$(document).ready(function() {

    LocationController.getLocations().then(function(response) {
        console.log("Locations", response);
        console.log(loadPage("templates/locations.html"));
        buildTemplate(null, loadPage("templates/locations.html"), "content-container");
    });

    RestaurantController.getRestaurants(1).then(function(response) {
        console.log("Restaurants", response);
    });

    MenuController.getMenu(1).then(function(response) {
        console.log("Menu", response);
    });

    OrderController.addItemToOrder(1, 199, 958, 13.95, 1, []);
    OrderController.addItemToOrder(2, 199, 958, 13.95, 1, []);
    sessionStorage.getItem('orderItems');

    OrderController.sendOrder().then(function(response) {
        console.log("Order", response);
        console.log("Order Number", response.orderNumber);
    });
});

function loadPage(href)
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}
function buildTemplate(model, template, documentContainerId){
    document.getElementById(documentContainerId).innerHTML = template;
    LocationController.getLocations();
    outputTemplate("restaurant");

};
function outputTemplate(data){
    console.log(data);

    var nodesArray = Array.prototype.slice.call(document.querySelectorAll('[data-' + data +  ']'));
    for(var i=0; i<nodesArray.length; i++){
        nodesArray[i].innerHTML = "Testing " + i;
    }
}


