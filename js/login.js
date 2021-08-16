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

function desconectar(){
    sessionStorage.clear();
    location.href="index.html"
}
