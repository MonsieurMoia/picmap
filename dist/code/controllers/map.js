var fs = require("fs"),
    OrchardRegistration = require("./orchardRegistration.js"),
    OrchardLoader = require("./orchardLoader.js"),
    EventEmitter = require('events').EventEmitter,
    showInMap = new EventEmitter(),
    confirmationLayout = fs.readFileSync( __dirname + "/../views/confirmationLayout.html"),
    orchardForm = fs.readFileSync( __dirname + "/../views/forms/orchardForm.html"),
    orchardDisplayForm = fs.readFileSync( __dirname + "/../views/forms/orchardDisplayForm.html"),
    dialogContainer = document.getElementById("dialog-container"),
    formDiv = document.getElementById("form-div"),
    mapDiv = document.getElementById("map"),
    Orchard = require("../models/orchard"),
    map = null,
    coordinates = null


function init(){


	map = L.map('map').setView([9.93, -84.081], 15); 
    map.locate({setView : true});

	//Default Map is Open Street Map
    // L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    //     maxZoom: 18
    // }).addTo(map);
    //mapbox
    L.tileLayer('http://{s}.tiles.mapbox.com/v4/pirika.l637o2ok/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGlyaWthIiwiYSI6IlZ2WEhkbjQifQ.g7f4GSE9UY5AIqOdNO6Mgg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
    }).addTo(map);


	loadAllOrchards();

    function onMapClick(e) {
        // if (confirm("Querés agregar una huerta en este punto?") == true) {
        //     
        // }
        // console.log(e.containerPoint);

        //Get Coordinates for Dialog Box
        var targetX = e.containerPoint.x,
            targetY = e.containerPoint.y;

        //Open Dialog Box
        showDialog(targetX,targetY,confirmationLayout,e);
        dialogOptions(e);
        
        //Show Dialog Options        
        function dialogOptions(events){
            
            coordinates = events.latlng;
            var btnConfirm = document.getElementById("confirm-marker"),
                btnCancel = document.getElementById("cancel-marker");

            btnConfirm.onclick = function(){
                showOrchardForm();
                removeDialog(); 
            }
            btnCancel.onclick = function(){
                hideDialog();
                setTimeout(function() {
                   removeDialog(); 
                }, 500);
            }
        }
            
	}

    //Function for Creating and Showing Confirmation Dialog
    function showDialog(x,y,template){
        dialogContainer.innerHTML = template; 
        var dialogPanel = document.getElementById("dialog-panel");

         
        setDialogInPos(dialogPanel);
        setMarker();

        //Get the dimensions of the Dialog Box
            function getSize(domEl){
                domElW = domEl.offsetWidth;
                domElH = domEl.offsetHeight;
                return {
                    width: domElW,
                    height: domElH
                }
            }

        //Set the Position for the Dialog
            function setDialogInPos(posEl){
                var size = getSize(posEl);
                posEl.style.left = x - (size.width/2);
                posEl.style.top = y - (size.height);
                posEl.classList.add("is-shown")
            }

        //Set the Marker in Position
            function setMarker(){
                var dialogMarker = document.createElement("span");
                dialogMarker.id = "dialog-marker";
                dialogMarker.classList.add("dialog-marker","is-shown");
                dialogContainer.appendChild(dialogMarker);

                var size = getSize(dialogMarker);
                
                dialogMarker.style.left = x - (size.width/2);
                dialogMarker.style.top = y - (size.height);

            }
        
    }

    //Actions when Mouse is being above the map
	function onMapMouseMove(e) {
		//console.log(e.latlng.toString());
	}

    //Actions when Marker is Selected
    function onMapPopupOpen(e) {
        coordinates = e.popup._source._latlng;
        var id = e.popup._leaflet_id;
        btn1 = document.getElementById("btn1");

        btn1.onclick = function(e){
            showOrchardDisplayForm(id, displayOrchard);
        }
    }

    function hideDialog(){
        var dialogPanel = document.getElementById("dialog-panel"),
            dialogMarker = document.getElementById("dialog-marker");
        if (dialogPanel) {
            dialogPanel.classList.remove("is-shown");
            dialogMarker.classList.remove("is-shown");
        }
    }

    function removeDialog(){
        var dialogPanel = document.getElementById("dialog-panel"),
            dialogMarker = document.getElementById("dialog-marker");
        if (dialogPanel) {
            dialogPanel.parentNode.removeChild(dialogPanel);
            dialogMarker.parentNode.removeChild(dialogMarker)
        };
    }

    //Actions When Map is being Dragged
    function onMapDragStart(){
       hideDialog();
    }

    //Actions when Map stops being dragged
    function onMapDragEnd(){
       removeDialog();
        // console.log("drgend"); 
    }

    function locateUser(e) {
        map.locate({setView : true});
    }

	map.on('click', onMapClick);
    map.on('mousemove', onMapMouseMove);
    map.on('popupopen', onMapPopupOpen);
    map.on('dragstart', onMapDragStart);
    map.on('dragend', onMapDragEnd);

    var btn1 = null;

 //    btn3.onclick = function(e){
 //        locateUser();
 //    }

    function registerOrchard(coordinates){
        var name = document.getElementById("orchardName").value;
        var description = document.getElementById("orchardDescription").value;
        var attendant = document.getElementById("orchardAttendant").value;
        var phone = document.getElementById("orchardPhone").value;
        var email = document.getElementById("orchardEmail").value;
        var web = document.getElementById("orchardWeb").value;
        var fb = document.getElementById("orchardFb").value;
        var schedule = document.getElementById("orchardSchedule").value;
        var characteristics = document.getElementById("orchardCharacteristics").value;
        var cropTypology = document.getElementById("orchardCropTypology").value;
        var size = document.getElementById("orchardSize").value;
        var crops = document.getElementById("orchardCrops").value;
        var specials = document.getElementById("orchardSpecials").value;
        var concepts = document.getElementById("orchardConcepts").value;
        var sharing = document.getElementById("orchardSharing").value;
        var help = document.getElementById("orchardHelp").value;
        var market = document.getElementById("orchardMarket").value;
        var location = coordinates;

        if (name != "" && description != "") {
            var params = [name, description, attendant, phone, email, web, fb, schedule, characteristics, cropTypology,
            size, crops, specials, concepts, sharing, help, market, location];
            OrchardRegistration.emit("registration", params);    
        } else {
            alert("Nombre y Descripción son requeridos");
        }
    }

    function loadAllOrchards(){
        OrchardLoader.emit("loadAll"); 
    }

    function showOrchardForm(){
        formDiv.innerHTML = orchardForm;
        formDiv.classList.add('is-shown');
        var btnToMap = document.getElementById("toMapBtn");
        var btnToRegisterForm = document.getElementById("registerFormBtn");
        btnToRegisterForm.onclick = function(e){
            registerOrchard(coordinates);
        }

        btnToMap.onclick = function(e){
            showMap();
        }
    }



    function showOrchardDisplayForm(id, callback){
        formDiv.innerHTML = orchardDisplayForm;
        formDiv.classList.add('is-shown');
        var btnToMap = document.getElementById("toMapBtn");
        var orchardId = id;
        /*var btnToRegisterForm = document.getElementById("registerFormBtn");
        btnToRegisterForm.onclick = function(e){
            registerOrchard(coordinates);
        }*/

        btnToMap.onclick = function(e){
            showMap();
        }

        callback(orchardId);
    }

    function showMap(){
        // formDiv.innerHTML = "";
        console.dir(map); 
        formDiv.classList.remove('is-shown');
        //map.setView([coordinates.lat, coordinates.lng], 18);
        map.setView([coordinates.lat, coordinates.lng], 18);
        window.scrollTo(0, 0);
        setTimeout(map.invalidateSize.bind(map));
    }

    function displayOrchard(id) {
        var orchardId = id.toString();
        var name = document.getElementById("orchardName");
        var description = document.getElementById("orchardDescription");
        var attendant = document.getElementById("orchardAttendant");
        var phone = document.getElementById("orchardPhone");
        var email = document.getElementById("orchardEmail");
        var web = document.getElementById("orchardWeb");
        var fb = document.getElementById("orchardFb");
        var schedule = document.getElementById("orchardSchedule");
        var characteristics = document.getElementById("orchardCharacteristics");
        var cropTypology = document.getElementById("orchardCropTypology");
        var size = document.getElementById("orchardSize");
        var crops = document.getElementById("orchardCrops");
        var specials = document.getElementById("orchardSpecials");
        var concepts = document.getElementById("orchardConcepts");
        var sharing = document.getElementById("orchardSharing");
        var help = document.getElementById("orchardHelp");
        var market = document.getElementById("orchardMarket");

        var orchard = Orchard.find(orchardId);
        console.log(orchard);

        name.innerHTML = orchard.name;
        description.innerHTML = orchard.description;
        attendant.innerHTML = orchard.attendantName;
        phone.innerHTML = orchard.phone;
        email.innerHTML = orchard.email;
        web.innerHTML = orchard.web;
        fb.innerHTML = orchard.facebook;
        schedule.innerHTML = orchard.schedule;
        characteristics.innerHTML = orchard.characteristics;
        cropTypology.innerHTML = orchard.cropTypology;
        size.innerHTML = orchard.size;
        crops.innerHTML = orchard.grownCrops;
        specials.innerHTML = orchard.specialProducts;
        concepts.innerHTML = orchard.cultivationConcepts;
        sharing.innerHTML = orchard.availableForSharing;
        help.innerHTML = orchard.needHelpWith;
        market.innerHTML = orchard.shareOrMarket;

        function emphasizeData(){
            var panelDisplay = document.getElementById("panel-display").querySelector(".panel-body");
            var cards = panelDisplay.getElementsByClassName("card");

            for (var i = cards.length - 1; i >= 0; i--) {
                var cardText = cards[i].getElementsByTagName("p")[0].textContent;
                if (cardText == "") {
                    cards[i].classList.add("disabled") 
                };
            };

        }
        emphasizeData();
        
    }

    showInMap.on('showAllOrchards', function(){
        for (var i = Orchard.all().length - 1; i >= 0; i--) {
            var orchard = Orchard.all()[i];
            var marker = L.marker([orchard.location.lat, orchard.location.lng]).addTo(map);
            marker._leaflet_id = orchard.id;
            marker.bindPopup(
                "<a id=\"btn1\" class='title btn btn-primary'><i class='fa fa-home'></i>" + orchard.name + "</a>" + "<p class='body'>" + orchard.description + "</p>" 
            ); 
            marker._popup._leaflet_id = orchard.id;
        };
    });

    showInMap.on('showMapView', function(){
        showMap();
    });
}

module.exports = {
    init: init(),
    showInMap: showInMap
}



