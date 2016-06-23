describe('menu-controller-spec', function() {

    it('should check the public api', function() {
        expect(typeof MenuController.getMenu).toBe('function');
    });
});