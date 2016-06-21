var Menus = function () {

    function getMenu(restaurantId) {
        fetch('/restaurants/' + restaurantId).then(function (response) {
            return response;
        });
    }

    return {
        getMenu: getMenu
    };
}();