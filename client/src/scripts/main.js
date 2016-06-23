$(document).ready(function () {

    // trigger hash change to start the application
    $(window).trigger('hashchange');

    $('[class^=cart-logo-]').click(function () {
        console.log('show shopping cart');

        // show the cart using class applied by jQuery
    });

    $('.hide-cart').click(function () {
        console.log('hide shopping cart');

        // hide the cart using class applied by jQuery
    });

    $('.add-coupon').click(function () {
        console.log('add coupon');

        var discount = $('.coupon-value').text();
        discount = parseFloat(discount) / 100.0;

        OrderController.addCoupon(discount);
    });

    $('.proceed-checkout').click(function () {
        console.log('proceed to checkout');

        // hide the proceed button using jQuery

        // show the payment details using jQuery
    });

    $('.place-order').click(function () {
        console.log('place order');

        //TODO: validate inputs before they can proceed

        var orderType = $('.order-type input:checked').text();
        var deliveryAddress = $('.delivery-address input').text();
        var collectionTime = $('.collection-time option:selected').text()
        var paymentType = $('.payment-type input[type="radio"]:checked').text();
        var cardNumber = $('.payment-type input#card-number').text();
        var cardType = $('.payment-type input#card-type').text();
        var name = $('.customer-name input').text();
        var phoneNumber = $('.customer-phone input').text();

        OrderController.sendOrder(
            orderType, deliveryAddress, collectionTime,
            paymentType, cardNumber, cardType,
            name, phoneNumber).then(function (response) {
            // show the confirmation when the order is placed
        });
    });
});




