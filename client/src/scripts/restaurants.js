var Restaurants = function () {
    
    var getRestaurants = function (locationId) {
        fetch('/locations/' + locationId).then(function(response) {
            return response.restaurants;
        });
    };


    var buildTemplate = function (model) {};


    return{
        getRestaurants : getRestaurants,
        buildTemplate : buildTemplate
    }
}();