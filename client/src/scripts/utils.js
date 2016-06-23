var Utils = function () {

    
    
    
    
    var loadTemplate = function(href, data) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                buildTemplate(data, xmlhttp.responseText, "content-container");
            }
        };
        xmlhttp.open("GET", href, true);
        xmlhttp.send();

    }
    var buildTemplate = function(model, template, documentContainerId) {
        document.getElementById(documentContainerId).innerHTML = template;

        //console.log(JSON.stringify(model));
        buildPageFromObject(model);
        //outputTemplate("restaurant");


    };

    var buildPageFromObject = function(obj) {

        if($.isArray(obj)){
            //console.log("Array");
            for(var i=0; i<obj.length; i++){
                buildPageFromObject(obj[i]);
            }
        }
        else{
            //console.log("Object" + obj);
            outputTemplate(obj);
        }

    }

    var insertAfter = function(newElement,targetElement) {
        //target is what you want it to go after. Look for this elements parent.
        var parent = targetElement.parentNode;

        //if the parents lastchild is the targetElement...
        if(parent.lastchild == targetElement) {
            //add the newElement after the target element.
            parent.appendChild(newElement);
        } else {
            // else the target has siblings, insert the new element between the target and it's next sibling.
            parent.insertBefore(newElement, targetElement.nextSibling);
        }
    }

    var outputTemplate = function(object) {

        for (var k in object) {

            //console.log("key" + k);
            if(k != "id"){
                var nodesArray = Array.prototype.slice.call(document.querySelectorAll('[data-' + k + ']'));
                //console.log("nodeArray Len:" +nodesArray.length);
                for (var i = 0; i < nodesArray.length; i++) {

                    if(nodesArray[i].textContent.length > 0){
                        //console.log("Insert")
                        var cln = nodesArray[i].cloneNode(true);
                        cln.innerHTML = object[k];

                        cln.removeAttribute('data-' + k);
                        if(object["id"] !== undefined){
                            cln.setAttribute("data-id",object["id"] );
                        }
                        insertAfter( cln, nodesArray[i]);

                    }
                    else{


                        if(nodesArray[i].hasChildNodes()){
                            console.log("has Children");
                            var children  = nodesArray[i].childNodes;
                            for(var j=0; j<children.length; j++ ){
                                console.log(children[j]);

                                var attribs = children[j].attributes;
                                if(attribs !== undefined){
                                    for(var k=0; k< attribs.length; k++ ){
                                        console.log("Attribute: " + attribs[k].name);
                                        if((attribs[k].name).indexOf('data') > -1 ){
                                            console.log("Attribute: " + attribs[k].name);
                                        }
                                    }
                                }

                            }
                        }
                        nodesArray[i].innerHTML =  object[k];
                        //console.log("ID " + object["id"]);
                        if(object["id"] !== undefined){

                            
                            nodesArray[i].setAttribute("data-id",object["id"] );
                        }

                    }
                }
            }


        }




    }
    return {
        loadTemplate: loadTemplate
    }
}();