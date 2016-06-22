var OrderController = function () {

    function addItemToCart(restaurantId, categoryId, itemId, price, quantity, variations) {
        var cartItems = retrieveCart().items;
        cartItems.push({
            restaurantId: restaurantId,
            categoryId: categoryId,
            itemId: itemId,
            price: price,
            quantity: quantity,
            variations: variations
        });
        updateCart(cartItems);
    }

    function removeItemFromCart(itemId) {
        var cartItems = retrieveCart().items;
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].itemId == itemId) {
                cartItems.splice(i, 1);
            }
        }
        updateCart(cartItems);
    }

    function sendOrder(discount, orderType, address, collectionTime, paymentType, cardNumber, cardType, expiryDate, custName, custPhone) {
        var data = {
            orderItems: retrieveCartItems(),
            discount: discount,
            totalPrice: retrieveTotalPrice(),
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
            clearCart();
            return response.json();
        }).catch(function (error) {
            // error
        });
    }

    function retrieveCart() {
        var items = sessionStorage.getItem('cart.items');
        if (!items) {
            items = [];
        } else {
            items = JSON.parse(items);
        }

        var totalPrice = sessionStorage.getItem('cart.totalPrice');
        if (!totalPrice) {
            totalPrice = 0.00;
        } else {
            totalPrice = JSON.parse(totalPrice);
        }

        return {
            items: items,
            totalPrice: totalPrice
        };
    }

    function updateCart(cartItems) {
        sessionStorage.setItem('cart.items', JSON.stringify(cartItems));
        sessionStorage.setItem('cart.totalPrice', Calculator.calculateTotal(cartItems));
    }

    function clearCart() {
        sessionStorage.removeItem('cart.items');
        sessionStorage.removeItem('cart.totalPrice');
    }

    return {
        addItemToCart: addItemToCart,
        removeItemFromCart: removeItemFromCart,
        sendOrder: sendOrder
    };
}();