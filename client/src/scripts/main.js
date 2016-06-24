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

        var orderType = $('#checkout-details .order-type input:checked').text();
        var deliveryAddress = $('#checkout-details .delivery-address input').text();
        var collectionTime = $('#checkout-details .collection-time option:selected').text()
        var paymentType = $('#checkout-details .payment-type input[type="radio"]:checked').text();
        var cardNumber = $('#checkout-details .payment-type input#card-number').text();
        var cardType = $('#checkout-details .payment-type input#card-type').text();
        var name = $('#checkout-details .customer-name input').text();
        var phoneNumber = $('#checkout-details .customer-phone input').text();

        OrderController.sendOrder(
            orderType, deliveryAddress, collectionTime,
            paymentType, cardNumber, cardType,
            name, phoneNumber).then(function (response) {
            // show the confirmation when the order is placed
                console.log("Confirmed order", JSON.parse(response));
        });
    });
});




