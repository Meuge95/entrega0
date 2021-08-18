

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    //console.log('Full Name: ' + profile.getName());
    //console.log('Given Name: ' + profile.getGivenName());
    //console.log('Family Name: ' + profile.getFamilyName());
    //console.log("Image URL: " + profile.getImageUrl());
    //console.log("Email: " + profile.getEmail());
  
    
    let usuario={}
  
    usuario.nombre=profile.getName();
    usuario.estado="Conectado"
    localStorage.setItem("usuario" , JSON.stringify(usuario));
    /*var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);*/
    location.href="index.html";
    
    
  }

  function singOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.singOut().then(function(){
        //lo que quiero hacer cuando me desconecto
        href="login.html"
    });
}