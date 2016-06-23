var LocationController = function() {
    
    function getLocations(){
        return fetch('/locations').then(function(response) {
            return response.json();
        });
    }
    function getView(model){
        var htmlView = "<h3>Order Online Now</h3><ul id='locationList'>";
        for(var i=0; i<model.length; i++){
            htmlView += "<li data-id='" +  model[i].id + "'>" + model[i].name + "</li>";
        }
        htmlView +="</ul>"
        return htmlView;
    }

    return {
        getLocations: getLocations,
        getView: getView
    }
}();