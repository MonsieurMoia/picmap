var fs = require("fs"); 
var formDiv = document.getElementById("form-div");
var mapDiv = document.getElementById("map");
var orchardForm = fs.readFileSync( __dirname + "/../views/forms/orchardForm.html")

function init(){
	var map = L.map('map').locate({setView : true});

	//mapbox
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/armova.jp1fifm4/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
	}).addTo(map);
	
	//openstreetmap
	/*L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);*/

	var id = 0;

    var marker = L.marker([9.93224, -84.07906]).addTo(map);

    var circle = L.circle([9.93529, -84.10403], 700, {
    	color: 'red',
    	fillColor: '#f03',
    	fillOpacity: 0.25
	}).addTo(map);

	var polygon = L.polygon([
    	[9.93639, -84.05107],
    	[9.93394, -84.0709],
    	[9.92218, -84.05511]
	]).addTo(map);

	marker.bindPopup("<b>Soy un popup en el centro de SJ!</b><br>Aquí va información X que el creador del popup añade.");/*.openPopup()*/
	circle.bindPopup("Parque buenísimo para hacer deportes");
	polygon.bindPopup("Zona de combate chancletudo.");

	/*var popup = L.popup()
    .setLatLng([9.922, -84.065])
    .setContent("I am a standalone popup.")
    .openOn(map);*/

    var popup = L.popup();

    function onMapClick(e) {
    	/*popup
        	.setLatLng(e.latlng)
        	.setContent("Hiciste click en estas cordenadas " + e.latlng.toString() 
        		+ "<br> Eventualmente podrías agregar un nuevo popup para señalar un punto")
        	.openOn(map);*/

        formDiv.innerHTML = orchardForm;
        mapDiv.style.visibility = "hidden";
        mapDiv.style.height = "0%";
        formDiv.style.visibility = "visible";
        formDiv.style.height = "80%";
        var btnToMap = document.getElementById("toMapBtn");

        btnToMap.onclick = function(e){
            formDiv.innerHTML = null;
            formDiv.style.visibility = "hidden";
            formDiv.style.height = "0%";
            mapDiv.style.visibility = "visible";
            mapDiv.style.height = "80%";
        } 
	}

	function onMapMouseMove(e) {
		console.log(e.latlng.toString());
	}

    function locateUser(e) {
        map.locate({setView : true});
    }

	map.on('click', onMapClick);
	map.on('mousemove', onMapMouseMove);

	var btn1 = document.getElementById("btn1"); 
	var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3"); 

	btn1.onclick = function(e){
		L.tileLayer('http://{s}.tiles.mapbox.com/v3/armova.jp1fifm4/{z}/{x}/{y}.png', {
    	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    	maxZoom: 18
		}).addTo(map);

	}

	btn2.onclick = function(e){
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);
    }

    btn3.onclick = function(e){
        console.log("adentro onclick");
        locateUser();

    }

}

module.exports = init()




