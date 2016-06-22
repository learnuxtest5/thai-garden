var OrderController = function () {

    function retrieveOrderItems() {
        var orderItems = sessionStorage.getItem('orderItems');
        if (!orderItems) { // check if an item is already registered
            orderItems = []; // if not, we initiate an empty array
        } else {
            orderItems = JSON.parse(orderItems); // else parse whatever is in
        }
        return orderItems;
    }

    function updateOrderItems(orderItems) {
        sessionStorage.setItem('orderItems', JSON.stringify(orderItems));
    }

    function clearOrderItems() {
        sessionStorage.removeItem('orderItems');
    }

    function addItemToOrder(restaurantId, categoryId, itemId, price, quantity, variations) {
        var orderItems = retrieveOrderItems();
        orderItems.push({
            restaurantId: restaurantId,
            categoryId: categoryId,
            itemId: itemId,
            price: price,
            quantity: quantity,
            variations: variations
        });
        updateOrderItems(orderItems);
    }

    function removeItemFromOrder(itemId) {
        var orderItems = retrieveOrderItems();
        for (var i=0; i < orderItems.length; i++) {
            if (orderItems[i].itemId == itemId) {
                orderItems.splice(i, 1);
            }
        }
        updateOrderItems(orderItems);
    }

    function sendOrder(discount, orderType, address, collectionTime, paymentType, cardNumber, cardType, expiryDate, custName, custPhone) {
        var data = {
            orderItems: retrieveOrderItems(),
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

        return fetch('/orders',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: data
        }).then(function (response) {
            clearOrderItems();
            return response.json();
        }).catch(function(error) {
            // error
        });
    }

    return {
        addItemToOrder: addItemToOrder,
        removeItemFromOrder: removeItemFromOrder,
        sendOrder: sendOrder
    };
}();