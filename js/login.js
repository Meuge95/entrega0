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
       
        usuario.nombre = dato.value;
        usuario.estado ="conectado";
        location.href="index.html";

        localStorage.setItem("usuario" , JSON.stringify(usuario));
    }


}



function desconectar(){
    localStorage.clear();
    usuario.estado="Desconectado";
    location.href="login.html";
    singOut();
}

function singOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.singOut().then(function(){
        //lo que quiero hacer cuando me desconecto
        href="login.html";
        console.log("Yser signed Out.");
    });
}
function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
    
  }