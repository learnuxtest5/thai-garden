var Calculator = function() {

    function calculateTotal(cartItems) {
        var totalCost = 0.00;

        for (var i=0; i < cartItems.length; i++) {
            var itemCost = parseFloat(cartItems[i].price) * parseInt(cartItems[i].quantity);

            for (var j=0; j < cartItems[i].variations.length; j++) {
                itemCost += parseFloat(cartItems[i][j].price);
            }

            totalCost += itemCost;
        }
        return totalCost.toFixed(2);
    }

    return {
        calculateTotal: calculateTotal
    }
}();