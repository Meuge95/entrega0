//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
// key google= 13093693165-cochq5t90d0llc519nu97v7ck8uea9sf.apps.googleusercontent.com
document.addEventListener("DOMContentLoaded", function(e){

});

function verificacion(){
    let dato = document.getElementById("user");
    let usuario = {};
    if(dato.value.trim() === ""){
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

  // The ID token you need to pass to your backend:
  let usuario={}

  usuario.nombre=profile.getName();
  usuario.estado="Conectado"
  localStorage.setItem("usuario" , JSON.stringify(usuario));
  /*var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);*/
  location.href="index.html";
  alert("Conectado");
}


function desconectar(){
    sessionStorage.clear();
    location.href="index.html"
}
