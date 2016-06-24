var Router = function () {
    
    $(window).on('hashchange', routePage);

    function routePage() {
        var pageName = (window.location.hash) ? window.location.hash : "#locations";

        var name = pageName.split('/')[0];
        var id = pageName.split('/')[1];

        switch(name) {
            case '#locations':
                LocationController.getLocations().then(function (response) {

                    document.getElementById("content-container").innerHTML = LocationController.getView(response);
                    $('body').on('click', '#locationList', function (event) {
                        // Add or Remove the class on clicking the table row
                        window.location.hash = "restaurants/" + event.target.getAttribute("data-id");
                    });
                });
                break;
            case '#restaurants':
                RestaurantController.getRestaurants(id).then(function(response) {
                    if(response.length == 1){
                        MenuController.getMenu(response[0].id).then(function (response) {
                            document.getElementById("content-container").innerHTML = MenuController.getView(response);
                            $('body').on('click', '.menu-section-container', function (event) {
                                //remove all other containers that are expanded

                                if(event.target.className == "menu-item-title"){
                                    //$('.menu-item-expanded-container').remove();
                                    var menuItem = $('#' + event.target.id).data('menuItem');
                                    if($("#menu-item-expanded_" + menuItem.Id).length == 0){
                                        $('#' + event.target.id).parent().next().after(MenuController.getExpandedView(menuItem));
                                    }
                                    else{
                                        $("#menu-item-expanded_" + menuItem.Id).toggle();
                                    }
                                }
                                else if(event.target.className == "minus-image"){
                                    var id = $('#' + event.target.id).data('id');
                                    var quantity = parseInt($('#quantity_' +id).data('quantity'));
                                    if(quantity > 0){
                                        quantity--;
                                        $('#quantity_' +id).data('quantity', quantity);
                                        $('#quantity_' +id).val(quantity);
                                    }
                                }
                                else if(event.target.className == "plus-image"){
                                    var id = $('#' + event.target.id).data('id');
                                    var quantity = parseInt($('#quantity_' +id).data('quantity'));
                                    quantity++;
                                    $('#quantity_' +id).data('quantity', quantity);
                                    $('#quantity_' +id).val(quantity);

                                }
                                else if(event.target.className == "link-red"){
                                    var id = $('#' + event.target.id).data('id');
                                    $("#menu-item-expanded_" + id).toggle();
                                }
                                else if(event.target.className == "btn"){
                                    OrderController.addItemToCart();
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