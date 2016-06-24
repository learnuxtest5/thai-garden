var Calculator = function () {

    function calculateTotal(cartItems) {
        var totalCost = 0.00;

        for (var i = 0; i < cartItems.length; i++) {
            var itemCost = parseFloat(cartItems[i].price) * parseInt(cartItems[i].quantity);
            for (var j = 0; j < cartItems[i].variations.length; j++) {
                console.log("variation:" + cartItems[i].variations[j].Price);
                itemCost = itemCost + parseFloat(cartItems[i].variations[j].Price);
                console.log(itemCost);
            }
            totalCost += itemCost;
        }
        return totalCost.toFixed(2);
    }

    return {
        calculateTotal: calculateTotal
    }
}();