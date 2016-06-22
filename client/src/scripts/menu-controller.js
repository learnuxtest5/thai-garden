var MenuController = function () {

    function getMenu(restaurantId) {
        return fetch('/restaurants/' + restaurantId).then(function (response) {
            return response.json();
        });
    }

    return {
        getMenu: getMenu
    };
}();