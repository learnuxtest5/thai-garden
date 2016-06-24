var LocationController = function() {
    
    function getLocations(){
        return fetch('/locations').then(function(response) {
            return response.json();
        });
    }
    function getView(model){
        var htmlView = "<div class='locations-container'><div class='locations-container-title'>" +"Order Online Now" + "</div >";
        for(var i=0; i<model.length; i++){
            htmlView += "<div class='locations-container-item' data-id='" +  model[i].id + "'><span>" + model[i].name + "</span><img src='/img/chevron.png'></div>";
        }
        htmlView +="</div>"
        return htmlView;
    }

    return {
        getLocations: getLocations,
        getView: getView
    }
}();