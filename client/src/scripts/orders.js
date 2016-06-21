var Orders = function () {
    function placeOrder(orderItems, discount, orderType, address, collectionTime) {
        var data = {
            orderItems: orderItems,
            discount: discount,
            orderType: orderType,
            address: address,
            collectionTime: collectionTime,
            paymentType: paymentType,
            creditCard: {
                cardNumber: cardNumber,
                cardType: cardType,
                expiryDate: expiryDate
            },
            customerName: customerName,
            customerPhoneNumber: customerPhoneNumber
        };
        data = JSON.stringify(data);

        fetch('/orders',
        {
            method: "POST",
            body: data
        }).then(function (response) {
            return response.confirmationCode;
        }).catch(function(error) {
            // error
        });
    }

    return {
        placeOrder: placeOrder
    };
}();