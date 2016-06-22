var Locations = function() {

    function getLocations(){
        return fetch('/locations').then(function(response) {
            return response;
        });
    }

    return {
        getLocations: getLocations
    }
}();