describe('restaurant-controller-spec', function() {

    it('should check the public api', function() {
        expect(typeof RestaurantController.getRestaurants).toBe('function');
    });
});