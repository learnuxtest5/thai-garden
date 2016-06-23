var Router = function () {


    $(window).on('hashchange', routePage);

    function routePage() {
        var pageName = (window.location.hash) ? window.location.hash : "#locations";

        var name = pageName.split('/')[0];
        var id = pageName.split('/')[1];
        console.log(pageName + "  "  + id);
        /* switch for page specific functions, not used now */
        switch(name) {
            case '#locations':
                LocationController.getLocations().then(function (response) {

                    console.log("Locations", response);
                    //console.log(loadPage("templates/locations.html"));


                    document.getElementById("content-container").innerHTML = LocationController.getView(response);
                    $('body').on('click', '#locationList', function (event) {
                        console.log(event.target.getAttribute("data-id"));
                        // Add or Remove the class on clicking the table row
                        window.location.hash = "restaurants/" + event.target.getAttribute("data-id");
                    });
                });
                break;
            case '#restaurants':
                console.log("route to restaurants" + id);
                RestaurantController.getRestaurants(id).then(function(response) {
                    console.log("Restaurants:" + JSON.stringify(response));
                    console.log("RestaurantsLength:" + response.length);
                    if(response.length == 1){
                        MenuController.getMenu(response[0].id).then(function (response) {
                            //Utils.loadTemplate("templates/menu.html", response);
                            //console.log("Menu" +  JSON.stringify(response));
                            document.getElementById("content-container").innerHTML = MenuController.getView(response);
                            $('body').on('click', '.menu-section-container', function (event) {
                                //remove all other containers that are expanded
                                $('.menu-item-expanded-container').remove();
                                var menuItem = $('#' + event.target.id).data('menuItem');
                                console.log(menuItem);
                                // Add or Remove the class on clicking the table row
                                $('#' + event.target.id).parent().next().after(MenuController.getExpandedView(menuItem));

                            });
                        });
                    }
                    else{
                        //show list of restaurants in a location here
                        //this is a future release option where all restaurants in a location are shown
                        console.log("this is a future release option where all restaurants in a location are shown");
                    }
                });
                break;
        }
    }
}();