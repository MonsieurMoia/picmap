var UserRegistration = require("./code/controllers/userRegistration.js");
var UserLogin = require("./code/controllers/userLogin.js");
var fs = require("fs"); 

var insertCss = require("insert-css");
var css = fs.readFileSync( __dirname + "/assets/style.css" )
insertCss(css);

var homeLayout = fs.readFileSync( __dirname + "/code/views/homeLayout.html")
var loginLayout = fs.readFileSync( __dirname + "/code/views/loginLayout.html")
var signUpLayout = fs.readFileSync( __dirname + "/code/views/signUpLayout.html")
var mapLayout = fs.readFileSync( __dirname + "/code/views/mapLayout.html")

var container = document.querySelector("._3vot")
var homeLogContainer;
var loginCard;
var signupCard;


 //Load Home Layout
 container.innerHTML = homeLayout;
 var homeLogContainer = document.getElementById("home-log-container");
 goLogin();

// goLogin()

function goRegister(){

  var loginCard = document.getElementById("login-card");
  
  if (loginCard) {
    loginCard.classList.remove("is-shown")
    setTimeout(function() {
      changeViewtoRegister();
      setViewRegister();
    }, 500);  
  }else{
    changeViewtoRegister();
    setViewRegister();
  };

  function changeViewtoRegister(){
    homeLogContainer.innerHTML = signUpLayout;
    var signupCard = document.getElementById("signup-card");
    signupCard.classList.add("is-shown");
  }
 
}

function setViewRegister(){
    btnToLogin = document.getElementById("toLoginBtn");
    btnToLogin.onclick = function(e){
      e.preventDefault();
      goLogin()
    }
  
    btnRegistration = document.getElementById("registrationBtn");
    btnRegistration.onclick = function(e){
      e.preventDefault();
      var username = document.getElementById("registerUserName").value;
      var email = document.getElementById("registerEmail").value;
      var password = document.getElementById("registerPassword").value;
  
      if (username != "" && email != "" && password != "") {
      var params = [username, email, password];
      registration(params)  
      } else {
        alert("Todos los campos son requeridos");
      }
    }
  }

function goLogin(){
  // For production
  var signupCard = document.getElementById("signup-card");

  if (signupCard) {
    signupCard.classList.remove("is-shown");
    setTimeout(function() {
      changeViewtoLogin();
      setViewLogin()
    }, 500);
  }else{
    changeViewtoLogin();
    setViewLogin()
  };

  function changeViewtoLogin(){
    homeLogContainer.innerHTML = loginLayout;
    var loginCard = document.getElementById("login-card");
    loginCard.classList.add("is-shown");
  }

  // // For Testing
  // container.innerHTML = mapLayout;
  // var email = "moiacr@gmail.com";
  // var password = "Esmialma1987";
  // var params = [email, password];
  //     login(params)  
}

function setViewLogin(){
  btnLogin = document.getElementById("loginBtn");
  btnLogin.onclick = function(e){
    e.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    console.log(email); 
    console.log(password); 

    if (email != "" && password != "") {
      var params = [email, password];
      login(params)  
    } else {
      alert("Todos los campos son requeridos");
    }    
  }
  var btnToRegister = document.getElementById("toRegisterBtn");
  btnToRegister.onclick = function(e){
    e.preventDefault();
    goRegister();
  }
}

function registration(params){
	UserRegistration.emit("registration", params);
}

function login(params){
  UserLogin.emit("login", params);
}
