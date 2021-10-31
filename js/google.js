

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
   // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    //console.log('Full Name: ' + profile.getName());
    //console.log('Given Name: ' + profile.getGivenName());
   // console.log('Family Name: ' + profile.getFamilyName());
    //console.log("Image URL: " + profile.getImageUrl());
    //console.log("Email: " + profile.getEmail());
  
    
    let usuario={}
  
    usuario.nombre=profile.getGivenName();
    usuario.imagen = profile.getImageUrl();
    usuario.email = profile.getEmail();
    usuario.estado="conectado"
    localStorage.setItem("usuario" , JSON.stringify(usuario));
    // var id_token = googleUser.getAuthResponse().id_token;
    //console.log("ID Token: " + id_token);
    location.href="index.html";
    console.log(usuario);
   

    
  }

  