//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var perfil = [];


function datos(){
    perfil.nombre = document.getElementById('nomb').value;
    perfil.lastName = document.getElementById('apellido').value;
    perfil.correo = document.getElementById('email').value;
    perfil.años = document.getElementById('years').value;
    perfil.cel = document.getElementById('cel').value;

    if (perfil.nombre ==='' || perfil.lastName === '' || perfil.correo === '' || perfil.años === '' || perfil.telefono === ''){
        alert("Falta rellenar un campo, recuerde que todos los campos son obligatorios.")
    } else {
        
    
        localStorage.setItem('nomb', JSON.stringify(perfil.nombre));
        localStorage.setItem('apellido', JSON.stringify(perfil.lastName));
        localStorage.setItem('email', JSON.stringify(perfil.correo));
        localStorage.setItem('years', JSON.stringify(perfil.años));
        localStorage.setItem('cel', JSON.stringify(perfil.cel));
       
        
       
        location.href="my-profile.html";
    }

  
    


}

document.addEventListener("DOMContentLoaded", function (e) {
    if (localStorage.getItem('avatar') ){
        document.querySelector('#image').setAttribute('src', localStorage.getItem('avatar'));
    }

    if(localStorage.getItem('nomb') != null || localStorage.getItem('apellido') != null || localStorage.getItem('email') != null || localStorage.getItem('years') != null || localStorage.getItem('cel') != null){
       
        document.getElementById("nomb").value = JSON.parse(localStorage.getItem("nomb"));
        document.getElementById("apellido").value = JSON.parse(localStorage.getItem("apellido"));
        document.getElementById("email").value = JSON.parse(localStorage.getItem("email"));
        document.getElementById("years").value = JSON.parse(localStorage.getItem("years"));
        document.getElementById("cel").value = JSON.parse(localStorage.getItem("cel"));

    }

    
      document.getElementById('nombre2').innerHTML = "<h1>" + JSON.parse(localStorage.getItem("usuario")).nombre + "<h1>";


});


function inPic(img){
    let imagen = new FileReader(); //es una funcion que te lee el archivo 
    imagen.addEventListener('load', () => {  
     localStorage.setItem('avatar', imagen.result); //guarda en local
   

});
 imagen.readAsDataURL(img.files[0]); //esta convierte el archivo
 location.href="my-profile.html";
}
