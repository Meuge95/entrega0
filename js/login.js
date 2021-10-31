

function verificacion(){
    let dato = document.getElementById('usuario');
    let pass = document.getElementById('contraseña');
    let usuario = {};
    let contraseña = {};
    if(dato.value.trim() === '' || pass.value.trim() ===''){
        alert ("Falta completar un campo");
    }else {

        location.href = "index.html";
        usuario.nombre = dato.value;
        contraseña = pass.value;
        usuario.estado ="conectado";
        

        localStorage.setItem('usuario' , JSON.stringify(usuario));
        localStorage.setItem('contraseña' , JSON.stringify(contraseña));
    }
     

}
/*function registro(){
    let dato = document.getElementById('usuario');
    let pass = document.getElementById('contraseña');
    let correo = document.getElementById('correo');
    let nombreCompleto = document.getElementById('NombreCompleto')
    let usuario = {};
    let contraseña = {};
    let correo = {};
    if(dato.value.trim() === '' || pass.value.trim() ===''){
        alert ("Falta completar un campo");
    }else {

        location.href = "index.html";
        usuario.nombre = dato.value;
        contraseña = pass.value;
        correo = correo.value;
        usuario.estado ="conectado";
        

        localStorage.setItem('usuario' , JSON.stringify(usuario));
        localStorage.setItem('contraseña' , JSON.stringify(contraseña));
        localStorage.setItem('correo' , JSON.stringify(correo))
    }
     

}*/



function desconectar(){
    let usuario = localStorage.getItem('usuario');
    localStorage.clear();
    usuario.estado="desconectado";
    location.href="login.html";
    
    signOut();
}

function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function(){
        //lo que quiero hacer cuando me desconecto
        auth2.desconectar();
       console.log("User signed Out.");
    });
}

function onLoad() {
    gapi.load('auth2', function() {
      gapi.auth2.init();
    });
    
  }

  