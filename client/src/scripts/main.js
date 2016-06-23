$(document).ready(function () {

    //trigger hash change to start the application
    $(window).trigger('hashchange');
    




    OrderController.addItemToOrder(1, 199, 958, 13.95, 1, []);
    OrderController.addItemToOrder(2, 199, 958, 13.95, 1, []);
    sessionStorage.getItem('orderItems');


    OrderController.sendOrder().then(function(response) {
        console.log("Order", response);
        console.log("Order Number", response.orderNumber);
    });
});




