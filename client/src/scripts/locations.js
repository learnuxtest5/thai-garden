var Locations = function() {

    function getLocations(){
        fetch('/locations').then(function(response) {
            return response;
        });
    }

    return {
        getLocations: getLocations
    }
}();