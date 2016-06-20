var Restaurants = function(){

    var restaurantsList = [];
    var getRestaurants = function(locationId){
        fetch('flowers.jpg')
            .then(function(response) {
                return response.blob();
            })
            .then(function(myBlob) {
                var objectURL = URL.createObjectURL(myBlob);
                myImage.src = objectURL;
            });
    };
    var buildTemplate = function(model){

    };
    return{
        getRestaurants : function(locationId){
            getRestaurants(locationId);
        },
        buildTemplate : function (model) {
            buildTemplate(model);
        }


    }

}();