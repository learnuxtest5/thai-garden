describe('calculator-util-spec', function() {

    it ('should check the public api', function() {
        expect(typeof Calculator.calculateTotal).toBe('function');
    });

    it('should calculate the total price of all items in the cart', function() {

        var cartItem = {
            restaurantId: 1,
            categoryId: 2,
            itemId: 3,
            price: 11.00,
            quantity: 3,
            variations: [
                {
                    id: 4,
                    price: 6.50
                }
            ]
        };

        var cartItems = [];
        cartItems.push(cartItem);

        expect(Calculator.calculateTotal(cartItems)).toBe('39.50');
    });
});