var RestaurantController = function () {

    var getRestaurants = function (locationId) {
        return fetch('/locations/' + locationId).then(function (response) {
            return response.json();
        });
    };

    return {
        getRestaurants: getRestaurants
    }
}();