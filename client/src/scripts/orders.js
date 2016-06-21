var Orders = function () {
    function placeOrder(orderItems, discount, orderType, address, collectionTime, paymentType, cardNumber, cardType, expiryDate, custName, custPhone) {
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
            customer: {
                custName: custName,
                custPhone: custPhone
            }
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