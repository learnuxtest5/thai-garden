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
                            document.getElementById("content-container").innerHTML = MenuController.getView(response, id);
                            $('body').on('click', '.menu-section-container', function (event) {
                                //remove all other containers that are expanded

                                if(event.target.className == "menu-item-title"){
                                    //$('.menu-item-expanded-container').remove();
                                    var menuItem = $('#' + event.target.id).data('menuItem');
                                    console.log(menuItem);
                                    console.log($("#menu-item-expanded_" + menuItem.Id).length == 0);
                                    if($("#menu-item-expanded_" + menuItem.Id).length == 0){
                                        $('#' + event.target.id).parent().next().after(MenuController.getExpandedView(menuItem));
                                    }
                                    else{
                                        $("#menu-item-expanded_" + menuItem.Id).toggle();
                                    }
                                    // Add or Remove the class on clicking the table row

                                }
                                else if(event.target.className == "minus-image"){
                                        
                                    console.log($('#' + event.target.id));
                                    var id = $('#' + event.target.id).data('id');
                                    var quantity = parseInt($('#quantity_' +id).data('quantity'));
                                    if(quantity > 0){
                                        quantity--;
                                        $('#quantity_' +id).data('quantity', quantity);
                                        $('#quantity_' +id).val(quantity);
                                    }

                                    console.log(quantity);

                                }
                                else if(event.target.className == "plus-image"){

                                    console.log($('#' + event.target.id));
                                    var id = $('#' + event.target.id).data('id');
                                    var quantity = parseInt($('#quantity_' +id).data('quantity'));
                                    quantity++;
                                    $('#quantity_' +id).data('quantity', quantity);
                                    $('#quantity_' +id).val(quantity);
                                    console.log(quantity);

                                }
                                else if(event.target.className == "link-red"){
                                    var id = $('#' + event.target.id).data('id');
                                    $("#menu-item-expanded_" + id).toggle();
                                }
                                else if(event.target.className == "btn"){
                                    var id = $('#' + event.target.id).data('id');
                                    console.log(id);
                                    var quantity = parseInt($('#quantity_' +id).data('quantity'));
                                    var menuItem = $('#' + id).data('menuItem');
                                    var restaurantId = $('#' + id).data('restaurantId');
                                    var sectionId = $('#' + id).data('sectionId');
                                    var variations = [];
                                    console.log(menuItem);
                                    console.log(sectionId);
                                    console.log(restaurantId);
                                    if(quantity > 0){
                                        console.log($('.variations_' + id));
                                        if($('.variations_' + id + ':checked').length > 0){
                                            var variationsEls = $('.variations_' + id + ':checked');
                                            console.log(variationsEls.val());
                                            variations.push(variationsEls.val());
                                        }
                                        //restaurantId, categoryId, itemId, price, quantity, variations
                                        OrderController.addItemToCart(restaurantId, sectionId, menuItem.Id, menuItem.Title, menuItem.Price, quantity, variations);
                                    }
                                    else{
                                        alert("Your quantity is zero!! Please select a quantity");
                                    }
                                    //OrderController.addItemToCart()
                                }
                                else{
                                    console.log(event.target.className);
                                    console.log("Other menu events");
                                }


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