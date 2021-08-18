//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// key google= 13093693165-cochq5t90d0llc519nu97v7ck8uea9sf.apps.googleusercontent.com
document.addEventListener("DOMContentLoaded", function(e){

});

function verificacion(){
    let dato = document.getElementById("user");
    let contraseña = document.getElementById("key");
    let msj = document.getElementById("msj");
    let usuario = {};
    if(dato.value.trim() === "" || contraseña.value.trim() ===""){
        alert ("Falta completar un campo");
    }else {
        location.href="index.html"
        usuario.nombre = dato.value;

        localStorage.setItem("usuario" , JSON.stringify(usuario));
    }


}

function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  
  let usuario={}

  usuario.nombre=profile.getName();
  usuario.estado="Conectado"
  localStorage.setItem("usuario" , JSON.stringify(usuario));
  
 

  // The ID token you need to pass to your backend:
  /*var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);*/
  location.href="index.html";
  
}


function desconectar(){
    localStorage.clear();
    usuario.estado="Desconectado";
    location.href="login.html"
    
}

function singOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.singOut().then(function(){
        //lo que quiero hacer cuando me desconecto
        href="login.html"
    });
}
function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
    
  }