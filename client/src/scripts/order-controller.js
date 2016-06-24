var OrderController = function () {

    function addCoupon(percentage) {
        sessionStorage.setItem('cart.discount', parseFloat(percentage));
    }

    function addItemToCart(restaurantId, categoryId, itemId, itemName, price, quantity, variations) {
        var cartItems = retrieveCart().items;
        cartItems.push({
            restaurantId: restaurantId,
            categoryId: categoryId,
            itemId: itemId,
            itemName: itemName,
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
        sessionStorage.setItem('cart.items', JSON.stringify(cartItems));
        sessionStorage.setItem('cart.totalPrice', Calculator.calculateTotal(cartItems));
    }

    function clearCart() {
        sessionStorage.removeItem('cart.items');
        sessionStorage.removeItem('cart.totalPrice');
        sessionStorage.removeItem('cart.discount');
    }

    function getView() {
        var htmlView = "";
        htmlView += "<div class='shopping-cart'>" +
                         "<div class='order-details'>" +
                             "<h2>Your Order</h2>" +
                             "<table>";

                             var items = retrieveCart().items;
                             var totalPrice = retrieveCart().totalPrice;
                             var discount = 1.00 - parseFloat(retrieveCart().discount);

                             for (var i=0; i<items.length; i++) {
                             htmlView +=
                                "<tr>" +
                                    "<td>" + items[i].itemName + "</td>" +
                                    "<td>$" + items[i].price + "</td>" +
                                "</tr>";
                             }

                             htmlView +=
                                "<tr>" +
                                    "<td>Add Coupon</td>" +
                                    "<td>" +
                                        "<input id='coupon-value' type='text'/>" +
                                    "</td>" +
                                    "<td>" +
                                        "<button class='add-coupon'>Apply</button>" +
                                    "</td>" +
                                "</tr>" +
                               "<tr>" +
                                    "<td>Total</td>" +
                                    "<td>$" + (totalPrice * discount).toFixed(2) + "</td>" +
                               "</tr>" +
                             "</table>" +
                             "<button class='proceed-button'>Proceed to checkout</button>" +
                         "</div>" +

                         "<div id='checkout-details' class='hidden'>" +
                             "<h2>Checkout</h2>" +
                             "<table>" +
                                 "<tr>" +
                                     "<td>Order</td>" +
                                     "<td>" +
                                         "<form id='order-type'>" +
                                             "<input type='radio' name='orderType' value='Collection' checked> Collection<br>" +
                                             "<input type='radio' name='orderType' value='Delivery'> Delivery<br>" +
                                         "</form>" +
                                     "</td>" +
                                 "</tr>" +
                                 "<tr id='delivery-details' class='invisible'>" +
                                     "<td>Delivery Address</td>" +
                                     "<td>" +
                                         "<input id='delivery-address' type='text'/>" +
                                     "</td>" +
                                 "</tr>" +
                                 "<tr>" +
                                     "<td>Collect at</td>" +
                                     "<td>" +
                                         "<select id='collection-time'>" +
                                             "<option value='ASAP' selected>ASAP</option>" +
                                             "<option value='30'>+30 mins</option>" +
                                             "<option value='60'>+1 hour</option>" +
                                             "<option value='90'>+1 1/2 hours</option>" +
                                             "<option value='120'>+2 hours</option>" +
                                             "<option value='150'>+2 1/2 hours</option>" +
                                             "<option value='180'>+3 hours</option>" +
                                         "</select>" +
                                     "</td>" +
                                 "</tr>" +
                                 "<tr>" +
                                     "<td>Pay with</td>" +
                                     "<td>" +
                                         "<form id='payment-type'>" +
                                             "<input type='radio' name='paymentType' value='Cash' checked> Cash<br>" +
                                             "<input type='radio' name='paymentType' value='Card'> Credit/Debit Card<br>" +
                                         "</form>" +
                                         "<div id='card-details' class='invisible'>" +
                                             "<input id='card-number' placeholder='Card Number' type='text'/>" +
                                             "<select id='card-type'>" +
                                                 "<option value='Visa' selected>Visa</option>" +
                                                 "<option value='Visa Debit'>Visa Debit</option>" +
                                                 "<option value='MasterCard'>MasterCard</option>" +
                                             "</select>" +
                                         "</div>" +
                                     "</td>" +
                                 "</tr>" +
                                 "<tr>" +
                                     "<td>Name</td>" +
                                     "<td>" +
                                         "<input id='customer-name' type='text'/>" +
                                     "</td>" +
                                 "</tr>" +
                                 "<tr>" +
                                     "<td>Mobile No.</td>" +
                                     "<td>" +
                                         "<input id='customer-phone' type='text'/>" +
                                     "</td>" +
                                 "</tr>" +
                             "</table>" +

                             "<button class='cancel-order'>Cancel</button>" +
                             "<button class='place-order'>Place Order</button>" +
                         "</div>" +
                     "</div>";

        return htmlView;
    }

    return {
        addCoupon: addCoupon,
        addItemToCart: addItemToCart,
        removeItemFromCart: removeItemFromCart,
        sendOrder: sendOrder,
        getView: getView
    };
}();