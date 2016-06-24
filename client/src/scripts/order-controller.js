var OrderController = function () {

    function addCoupon(percentage) {
        sessionStorage.setItem('cart.discount', parseFloat(percentage));
    }

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

    function sendOrder(orderType, address, collectionTime, paymentType, cardNumber, cardType, custName, custPhone) {
        var data = {
            orderItems: retrieveCart().items,
            discount: retrieveCart().discount,
            totalPrice: retrieveCart().totalPrice,
            orderType: orderType,
            address: address,
            collectionTime: collectionTime,
            paymentType: paymentType,
            creditCard: {
                cardNumber: cardNumber,
                cardType: cardType
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
            });
    }

    function retrieveCart() {
        var discount = sessionStorage.getItem('cart.discount');
        if(!discount) {
            discount = 0.00;
        } else {
            discount = parseFloat(discount).toFixed(2);
        }

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
            totalPrice = parseFloat(totalPrice).toFixed(2);
        }

        return {
            discount: discount,
            items: items,
            totalPrice: totalPrice
        };
    }

    function updateCart(cartItems) {
        console.log(JSON.stringify(cartItems));
        sessionStorage.setItem('cart.items', JSON.stringify(cartItems));
        sessionStorage.setItem('cart.totalPrice', Calculator.calculateTotal(cartItems));
    }

    function clearCart() {
        sessionStorage.removeItem('cart.items');
        sessionStorage.removeItem('cart.totalPrice');
        sessionStorage.removeItem('cart.discount');
    }

    return {
        addCoupon: addCoupon,
        addItemToCart: addItemToCart,
        removeItemFromCart: removeItemFromCart,
        sendOrder: sendOrder
    };
}();