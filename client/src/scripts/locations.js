var Locations = function() {

    function getLocations(){
        fetch('/locations').then(function(response) {
            console.log('got locations', response.locations);
            return response.locations;
        });
    }

    return {
        getLocations: getLocations
    }
}();