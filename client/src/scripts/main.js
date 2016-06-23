$(document).ready(function () {

    // trigger hash change to start the application
    $(window).trigger('hashchange');

    $('[class^=cart-logo-]').click(function () {
        $('#shopping-cart').removeClass('hidden');
    });

    $('.hide-cart').click(function () {
        $('#shopping-cart').addClass('hidden');
    });

    $('.add-coupon').click(function () {
        var discount = parseFloat($('#coupon-value').val()) / 100.0;
        OrderController.addCoupon(discount);
    });

    $('.proceed-button').click(function () {
        $('.proceed-button').addClass('hidden');
        $('#checkout-details').removeClass('hidden');
    });

    $('.cancel-order').click(function() {
        $('.proceed-button').removeClass('hidden');
        $('#checkout-details').addClass('hidden');
    });

    $('.place-order').click(function () {
        var orderType = $('input[name="orderType"]:checked', '#order-type').val();
        var deliveryAddress = $('#delivery-address').val();
        var collectionTime = $('#collection-time').val();
        var paymentType = $('input[name="paymentType"]:checked', '#payment-type').val();
        var cardNumber = $('input#card-number').val();
        var cardType = $('#card-type').val();
        var customerName = $('input#customer-name').val();
        var customerPhone = $('input#customer-phone').val();

        //TODO: validate inputs before they can proceed

        OrderController.sendOrder(
            orderType, deliveryAddress, collectionTime,
            paymentType, cardNumber, cardType,
            customerName, customerPhone).then(function (response) {
                console.log("Order Number", response.orderNumber);
        });

        // TODO: clear inputs

        // TODO: inform user that the order was successful
    });

    $('#order-type input').on('change', function() {
        var selectedOrderType = $('input[name="orderType"]:checked', '#order-type').val();

        if (selectedOrderType === 'Delivery') {
            $('#delivery-details').removeClass('invisible');
        } else {
            $('#delivery-details').addClass('invisible');
        }
    });

    $('#payment-type input').on('change', function() {
        var selectedPaymentType = $('input[name="paymentType"]:checked', '#payment-type').val();

        if (selectedPaymentType === 'Card') {
            $('#card-details').removeClass('invisible');
        } else {
            $('#card-details').addClass('invisible');
        }
    });
});




