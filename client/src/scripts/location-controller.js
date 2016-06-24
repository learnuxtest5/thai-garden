var LocationController = function() {
    
    function getLocations(){
        return fetch('/locations').then(function(response) {
            return response.json();
        });
    }
    function getView(model){
        var htmlView = "<div class='locations-container'><div class='locations-container-title'>" +"Order Online Now" + "</div><ul id='locationList'>";
        for(var i=0; i<model.length; i++){
            htmlView += "<li data-id='" +  model[i].id + "'>" + model[i].name + "</li>";
        }
        htmlView +="</ul></div>"
        return htmlView;
    }

    return {
        getLocations: getLocations,
        getView: getView
    }
}();