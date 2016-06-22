var Restaurants = function () {

    var getRestaurants = function (locationId) {
        return fetch('/locations/' + locationId).then(function (response) {
            return response;
        });
    };

    return {
        getRestaurants: getRestaurants
    }
}();