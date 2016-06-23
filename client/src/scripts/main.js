$(document).ready(function () {

    // trigger hash change to start the application
    $(window).trigger('hashchange');

    $('[class^=cart-logo-]').click(function () {
        console.log('show shopping cart');

        $('#shopping-cart').removeClass('hidden');
    });

    $('.hide-cart').click(function () {
        console.log('hide shopping cart');

        $('#shopping-cart').addClass('hidden');
    });

    $('.add-coupon').click(function () {
        console.log('add coupon');

        var discount = $('.coupon-value input').text();
        discount = parseFloat(discount) / 100.0;

        OrderController.addCoupon(discount);
    });

    $('.proceed-button').click(function () {
        console.log('proceed to checkout');

        $('.proceed-button').addClass('hidden');

        $('#checkout-details').removeClass('hidden');
    });

    $('.place-order').click(function () {
        console.log('place order');

        //TODO: validate inputs before they can proceed

        var orderType = $('input[name="orderType"]:checked', '#order-type').val();
        var deliveryAddress = $('#delivery-address').val();
        var collectionTime = $('#collection-time').val();
        var paymentType = $('input[name="paymentType"]:checked', '#payment-type').val();

        var cardNumber = $('.payment-type input#card-number').text();
        var cardType = $('.payment-type input#card-type').text();
        var name = $('.customer-name input').text();
        var phoneNumber = $('.customer-phone input').text();

        console.log('orderType', orderType);
        console.log('address', deliveryAddress);
        console.log('collectionTime', collectionTime);
        console.log('paymentType', paymentType);
        console.log('cardNumber', cardNumber);
        console.log('cardType', cardType);
        console.log('name', name);
        console.log('phone', phoneNumber);

        OrderController.sendOrder(
            orderType, deliveryAddress, collectionTime,
            paymentType, cardNumber, cardType,
            name, phoneNumber).then(function (response) {
            // show the confirmation when the order is placed
                console.log("Confirmed order", JSON.parse(response));
        });
    });

    $('.cancel-order').click(function() {
        console.log('cancel order');

        $('.proceed-button').removeClass('hidden');

        $('#checkout-details').addClass('hidden');
    });

    // TODO: show hide card details depending on selected option
});




