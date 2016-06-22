var Calculator = function() {

    function calculateTotal(cartItems) {
        var totalCost = 0.00;
        for (var i=0; i < cartItems.length; i++) {
            var cartItemCost = parseFloat(cartItems[i].price) * parseInt(cartItems[i].quantity);
            console.log('item cost', cartItemCost);
            for (var j=0; j < cartItems[i].variations.length; j++) {
                cartItemCost += parseFloat(cartItems[i][j].price);
                console.log('updating item cost, adding ' +  parseFloat(cartItems[i][j].price), cartItemCost);
            }
            console.log('updating total cost with item cost ' + cartItemCost, totalCost);
            totalCost += cartItemCost;
        }
        return totalCost;
    }

    return {
        calculateTotal: calculateTotal
    }
}