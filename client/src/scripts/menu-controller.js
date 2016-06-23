var MenuController = function () {

    function getMenu(restaurantId) {
        return fetch('/restaurants/' + restaurantId).then(function (response) {
            return response.json();
        });
    }

    function getView(model){
        var htmlView = "";
        for(var i=0; i<model.length; i++){
            htmlView += createSection(model[i]);
        }
        
        return htmlView;
    }

    function createSection(section){
        var htmlSection = "<div><h3>" + section.Title +  "</h3>";
        for(var i=0; i<section.length; i++){
            htmlSection += createMenuItems(section.Items);
        }
        htmlSection += "</div>";
        return htmlSection;
    }

    function createMenuItems(menuItems){
        var htmlMenuItems = "<div>"
        for(var i=0; i<menuItems.length; i++){
            htmlMenuItems += "<div><h4>" + menuItems[i].Title + "</h4><span>€" + menuItems[i].Price + "</span></div>"
        }
        htmlMenuItems = "</div>"
        return htmlMenuItems;
    }

    return {
        getMenu: getMenu,
        getView: getView
    };
}();