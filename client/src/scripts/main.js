$(document).ready(function () {

    //trigger hash change to start the application
    $(window).trigger('hashchange');
    




    OrderController.addItemToCart(1, 199, 123, 13.95, 2, []);
    sessionStorage.getItem('cart.items');
    sessionStorage.getItem('cart.totalPrice');

    OrderController.addItemToCart(2, 199, 234, 10, 5, [{id: 976, price: 3.50}, {id: 975, price: 5.75}]);
    sessionStorage.getItem('cart.items');
    sessionStorage.getItem('cart.totalPrice');

    OrderController.removeItemFromCart(234);
    sessionStorage.getItem('cart.items');
    sessionStorage.getItem('cart.totalPrice');


    OrderController.sendOrder().then(function(response) {
        console.log("Order", response);
        console.log("Order Number", response.orderNumber);
        console.log("Order Price", response.totalPrice);
    });
    sessionStorage.getItem('cart.items');
    sessionStorage.getItem('cart.totalPrice');
});




