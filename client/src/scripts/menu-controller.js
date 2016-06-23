var MenuController = function () {

    function getMenu(restaurantId) {
        return fetch('/restaurants/' + restaurantId).then(function (response) {
            return response.json();
        });
    }

    function getView(model) {
        var htmlView = "";
        for (var i = 0; i < model.length; i++) {
            htmlView += createSection(model[i]);
        }

        return htmlView;
    }

    function createSection(section) {
        var htmlSection = "<div class='menu-section-container'><div class='menu-section-title'>" + section.Title + "</div>";

        console.log("Section:" + JSON.stringify(section.Items))
        htmlSection += createMenuItems(section.Items);

        htmlSection += "</div>";
        return htmlSection;
    }

    function createMenuItems(menuItems) {
        var htmlMenuItems = "<div class='menu-items-container'>"
        for (var i = 0; i < menuItems.length; i++) {
            console.log("Menu-Item:" + JSON.stringify(menuItems[i]));
            htmlMenuItems += "<div class='menu-item'><span id='"+ menuItems[i].Id +"' data-menu-item='" + JSON.stringify(menuItems[i]) + "' class='menu-item-title'>" + menuItems[i].Title.replace(/[0-9]/g, '') + "</span><span class='menu-item-price'>€" + menuItems[i].Price.toFixed(2) + "</span>" +
                "</div><div class='menu-item-description'>" + menuItems[i].Description + "</div>";
        }
        htmlMenuItems += "</div>"
        return htmlMenuItems;
    }

    function getExpandedView(model){
        var htmlExpandedItem = "<div id='menu-item-expanded_" + model.Id + "' ><div class='menu-item-expanded-container'>" +
            "<span class='menu-item-img'><img src='" + model.ImageUrl +  "' alt='food pic' height='130' width='150'></span>"
        if(model.HasVariation){
            htmlExpandedItem += createVariations(model.Variations);
        }


        htmlExpandedItem += "</div>"
        htmlExpandedItem += createButtonBar(model.Id);
        
        console.log(htmlExpandedItem);
        return htmlExpandedItem;
    }

    function createButtonBar(elementID){
        var htmlButtonBar = "<div class='menu-item-expanded-button-bar'>"
        htmlButtonBar += "<span ><img id='minus_" + elementID +"' data-id='" + elementID +"'' class='minus-image' src='img/blueMinus.jpg' alt='button minus' height='38' width='38 '></span>"
        htmlButtonBar += "<span class='menu-item-quantity-container'><input id='quantity_" + elementID +"' class='menu-item-quantity' data-quantity='0' value='0' type='text' name='quantity'></span>"
        htmlButtonBar += "<span ><img id='plus_" + elementID +"' data-id='" + elementID +"'' class='plus-image' src='img/bluePlus.jpg' alt='button plus' height='38' width='38 '></span>"
        htmlButtonBar += "<span class='button'><a class='btn'>Add to Cart</a></span><span class='button'><a id='close_" + elementID +"' data-id='" + elementID +"'' class='link-red'>Close</a></span>";
        htmlButtonBar += "</div>";
        return htmlButtonBar;
    }

    function createVariations(variations){
        var variationsHtml = "<span class='variation-item-container'>";
        for (var i = 0; i < variations.length; i++) {
            console.log("Variations:" + JSON.stringify(variations));
            var variationPrice = variations[i].Price.toFixed(2) ;
            if(variationPrice == 0.00){
                variationPrice = "";
            }
            else{
                variationPrice = "€" + variationPrice;
            }

            variationsHtml += "<span class='variation-item'><span class='variation-option'><input type='radio' name='variations' value='" + variations[i].id +  "'><span class='variation-item-title'>" + variations[i].Title.replace(/[0-9]/g, '') + "</span></span><span class='variation-item-price'>" + variationPrice + "</span>" +
                "</span>";
        }
        variationsHtml += "</span>";
        return variationsHtml;
    }

    return {
        getMenu: getMenu,
        getView: getView,
        getExpandedView: getExpandedView
    };
}();