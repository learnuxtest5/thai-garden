var LocationController = function() {
    
    function getLocations(){
        return fetch('/locations').then(function(response) {
            return response.json();
        });
    }

    return {
        getLocations: getLocations
    }
}();