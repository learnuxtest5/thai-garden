var Menus = function () {

    function getMenu(restaurantId) {
        return fetch('/restaurants/' + restaurantId).then(function (response) {
            return response;
        });
    }

    return {
        getMenu: getMenu
    };
}();