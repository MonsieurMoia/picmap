var EventEmitter = require('events').EventEmitter
var orchardRegistration = new EventEmitter();
var http = new XMLHttpRequest();
var User = require("../models/user")
var OrchardLoader = require("./orchardLoader.js");

http.onreadystatechange=function(){
	if (http.readyState==4 && http.status==200){
   		alert("Registro exitoso");
      OrchardLoader.emit("loadAll");
      var ShowInMap = require("./map.js").showInMap;
      ShowInMap.emit("showMapView");
   	} else if (http.readyState==4 && http.status!=200){
   		var response = JSON.parse(http.responseText);
   		alert("Error! " + response.error.message);
   	}

}

orchardRegistration.on('registration', function(params){
	var user = User.all()[0];
	var url = "http://sheltered-hollows-7317.herokuapp.com:80/api/orchards?access_token=" + user.token;
	var name = params[0];
	var description = params[1];
    var attendant = params[2]; 
    var phone = params[3];
    var email = params[4];
    var web = params[5];
    var fb = params[6];
    var schedule = params[7];
    var characteristics = params[8]; 
    var cropTypology = params[9];
    var size = params[10];
    var crops = params[11];
    var specials = params[12];
    var concepts = params[13];
    var sharing = params[14];
    var help = params[15];
    var market = params[16];
    var location = params[17];
    var today = new Date();
    var geoPoint = {
    	"lat": location.lat,
    	"lng": location.lng
    };

	var postParams = JSON.stringify({
  		"schedule": schedule,
  		"characteristics": characteristics,
  		"cropTypology": cropTypology,
  		"size": size,
  		"grownCrops": crops,
  		"specialProducts": specials,
  		"cultivationConcepts": concepts,
  		"availableForSharing": sharing,
  		"needHelpWith": help,
  		"shareOrMarket": market,
  		"created": today,
  		"updated": today,
  		"createdBy": user.id,
  		"updatedBy": user.id,
  		"name": name,
  		"attendantName": attendant,
  		"phone": phone,
  		"email": email,
  		"web": web,
  		"facebook": fb,
  		"description": description,
  		"location": geoPoint,
  		"ownerId": user.id
	});

	http.open("POST", url);
	http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	http.send(postParams);
	//console.log(http);
});

module.exports = orchardRegistration;

