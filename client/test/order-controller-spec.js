describe('order-controller-spec', function () {

    it('should check the public api', function () {
        expect(typeof OrderController.addCoupon).toBe('function');
        expect(typeof OrderController.addItemToCart).toBe('function');
        expect(typeof OrderController.removeItemFromCart).toBe('function');
        expect(typeof OrderController.sendOrder).toBe('function');
    });

    describe('session storage specs', function () {

        beforeEach(function () {
            sessionStorage.clear();

            // setup mock objects
            Calculator.calculateTotal = jasmine.createSpy("calculateTotal() spy").and.returnValue(0.00);
        });

        it('should be able to add a coupon', function () {
            OrderController.addCoupon(0.20);

            var discount = sessionStorage.getItem('cart.discount');
            expect(discount).toBe('0.2');
        });

        it('should be able to add items to the cart', function () {
            OrderController.addItemToCart(1, 199, 123, 13.95, 2, []);
            OrderController.addItemToCart(2, 198, 124, 10.00, 1, []);

            var cartItems = JSON.parse(sessionStorage.getItem('cart.items'));
            expect(cartItems.length).toBe(2);
        });

        it('should be able to remove items from the cart', function () {
            var cartItem = {
                restaurantId: 1,
                categoryId: 2,
                itemId: 3,
                price: 11.00,
                quantity: 3,
                variations: [
                    {
                        id: 4,
                        Price: 6.50
                    }
                ]
            };

            var cartItems = [];
            cartItems.push(cartItem);

            sessionStorage.setItem('cart.items', JSON.stringify(cartItems));

            OrderController.removeItemFromCart(3);

            cartItems = JSON.parse(sessionStorage.getItem('cart.items'));
            expect(cartItems.length).toBe(0);
        });
    });
});