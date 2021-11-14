var banco = false;
var crdit = false;

const Divizas = {
    USD: 'USD',
    UYU: 'UYU',
   
};
const DivizasP= {
    USD : 1,
    UYU: 0.025,
   
};
var divizaMode = Divizas.USD;
var articles = {};


document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            articles = resultObj.data;

            for(i =0; i < articles.articles.length; i++) {
                articles.articles[i].unitCost = convertirDiviza( articles.articles[i].unitCost, articles.articles[i].currency);
                articles.articles[i].currency = divizaMode;
            }



            showCarrito2(articles);
        }

    })
    document.getElementById('tarjetaCredito').addEventListener("click", function(){
        document.getElementById("cbox1").disabled = false;
        document.getElementById("expMes").disabled = false;
        document.getElementById("CCV").disabled = false;
        document.getElementById("titularT").disabled = false;
       

        document.getElementById("cuentaBancaria").disabled = true;

        crdit = true;
        banco=false;
    });

    document.getElementById("cbox2").addEventListener("click", function(){
        document.getElementById("cbox1").disabled = true;
        document.getElementById("expMes").disabled = true;
        document.getElementById("CCV").disabled = true;
        document.getElementById("titularT").disabled = true;

        document.getElementById("cuentaBancaria").disabled = false;

        crdit =false;
        banco=true;
    })




});

function showCarrito(array) {
   
    let contador = 0;
   
    for (i = 0; i < array.articles.length; i++) {
        document.getElementById("priceD"+ i ).innerHTML =  array.articles[i].currency +" " + array.articles[i].unitCost;
        contador += parseInt(document.getElementById("countD"+i).value);
    }
   

    let totals = 0;
    let subtotals = 0;
    let envios = 0;
    for (i = 0; i < array.articles.length; i++){
        
        subtotals += array.articles[i].unitCost;
        if(!isFree) envios += array.articles[i].unitCost * 0.01;
        else envios = 0;
        totals += array.articles[i].unitCost * array.articles[i].count + envios;  
    }
    total = totals;
    subtotal = subtotals;
    envi = envios;

    document.getElementById("subtotal").innerHTML = subtotal;
    document.getElementById("totis").innerHTML = total;
    document.getElementById("envio").innerHTML = envi;
    document.getElementById("contador").innerHTML = "Tu carrito tiene: " + contador + " productos." ;
}

function showCarrito2(array) {
    let contador = 0;

   var tabla ="<table class='table' style='margin: auto;'> <thead class='thead-light'><tr> <th scope='col' style='width: 26%'><h3> Imagen </h3></th><th scope='col' style='width: 26%'><h3> Nombre </h3></th> <th scope='col' style='width: 26%'><h3> Cantidad </h3></th><th scope='col' style='width: 26%'><h3> Precio </h3></th></tr></thead><tbody>";
   for (i = 0; i < array.articles.length; i++) {

        tabla += "<tr> <th scope='row'><img height='200' src=" + array.articles[i].src + "></th>  <td class='align middle'>" + array.articles[i].name  + "</td>   <td class='align middle'><input  type='number'  step='1' min='1'  id='countD"+ i +"' onchange='actualizar("+ i +")' value="+ array.articles[i].count +"></td>     <td class='align middle' id='priceD"+ i +"' >"+ array.articles[i].currency +" " + array.articles[i].unitCost + "</td> <td> <button class='btn btn-default' onclick='eliminar(" + i + ")'> <i class='far fa-trash-alt'></i> </button> </td>   </tr>";
        contador += parseInt(array.articles[i].count) ;
    }
    tabla += "  </tbody> </table>";
  

    document.getElementById("json").innerHTML = tabla;
    let totals = 0;
    let subtotals = 0;
    let envios = 0;
    for (i = 0; i < array.articles.length; i++){
        
        subtotals += array.articles[i].unitCost;
        if(!isFree) envios += array.articles[i].unitCost * 0.01;
        else envios = 0;
        totals += array.articles[i].unitCost * array.articles[i].count + envios;  
    }
    total = totals;
    subtotal = subtotals;
    envi = envios;

    document.getElementById("subtotal").innerHTML = "  " + subtotal;
    document.getElementById("totis").innerHTML = total;
    document.getElementById("envio").innerHTML = envi;
    document.getElementById("contador").innerHTML = "Tu carrito tiene: " + contador + " productos." ;
}

// teniendo 4 divizas diferentes lo mas conveniente es poner 1 de estas por default, para que las demas se multipliquen o dividan en torno a esa
function convertirDiviza(cost, diviza){ 
    let diValue;
    if ( diviza != divizaMode){
        switch(diviza){
            case Divizas.USD: diValue = DivizasP.USD ;
            break;
            case Divizas.UYU: diValue = DivizasP.UYU;
            break;
        }
        
    switch(divizaMode){
       
        case Divizas.USD: cost = cost * diValue;
        break;
        case Divizas.UYU: cost = (cost * diValue) * ( 1/DivizasP.UYU );
        break;

    }
 
}
    return cost;

}

var subtotal = 0;
var total = 0; 
var envi = 0;

function actualizar(num) {
    let subtotals = 0;
    let totals = 0;
    let envios =0;
    articles.articles[num].count = document.getElementById("countD" + num).value;
    //alert(articles.articles[num].count)
    for (i = 0; i < articles.articles.length; i++){
        
        subtotals += articles.articles[i].unitCost;
        if(!isFree) envios += articles.articles[i].unitCost * 0.01;
        else envios = 0;
        totals += articles.articles[i].unitCost * articles.articles[i].count + envios;
    }
    subtotal = subtotals;
    envi = envios
    total = totals;
   showCarrito(articles);

}

function cambiarDiviza(tipoDeD) { 
 divizaMode = tipoDeD;
 for(i =0; i < articles.articles.length; i++) {
    articles.articles[i].unitCost = convertirDiviza( articles.articles[i].unitCost, articles.articles[i].currency);
    articles.articles[i].currency = divizaMode;
}
showCarrito(articles);
}
 
var isFree = false;

function envio(){

 isFree = document.getElementById("free").checked;
 let subtotals = 0;
 let totals = 0;
 let envios =0;
 for (i = 0; i < articles.articles.length; i++){
     
     subtotals += articles.articles[i].unitCost;
     if(!isFree) envios += articles.articles[i].unitCost * 0.01;
     else envios = 0;
     totals += articles.articles[i].unitCost * articles.articles[i].count + envios;
 }
 subtotal = subtotals;
 envi = envios
 total = totals;
showCarrito(articles);

}



function eliminar (i) {
    articles.articles.splice(i,1);
    showCarrito2(articles);
    actualizar();

}


function vali () {

    let nrotarjeta = document.getElementById("cbox1");
    let expMes = document.getElementById("expMes");
    let CCV = document.getElementById("CCV");
    let nombre=document.getElementById("cuentaBancaria");
    let titularT = document.getElementById("titularT");
    
    
    
        
    if (crdit){
        //let modal = document.getElementById('exampleModal')
          
     if (nrotarjeta.value.trim() ===''  || expMes.value.trim() === '' || CCV.value.trim() === '' || titularT.value.trim() === ''){
        //alert("Falta rellenar un campo, recuerde que todos los campos son obligatorios.");
        nrotarjeta.classList.add("vali"); 
        expMes.classList.add("vali");
        CCV.classList.add("vali");
        titularT.classList.add("vali");
     }else{
        nrotarjeta.classList.remove("vali");
        expMes.classList.remove("vali");
        CCV.classList.remove("vali");
        titularT.classList.remove("vali");
        //$('#exampleModal .close').click();
       
    }
    }       
    if (banco){
        if (nombre.value.trim() === ''){
            nombre.classList.add("vali"); 
         } else{
                nombre.classList.remove("vali");
            }
    }
};

function pagar() {
   let nom = document.getElementById('nom');
   let apell = document.getElementById('apell');
   let tel = document.getElementById('tel');
   let dirc = document.getElementById('dirc');
   let postal = document.getElementById('postal');

    if( nom.value.trim() === '' || apell.value.trim() === '' || tel.value.trim() === '' || dirc.value.trim() === '' || postal.value.trim() === ''){
        nom.classList.add("vali"); 
        apell.classList.add("vali");
        tel.classList.add("vali");
        dirc.classList.add("vali");
        postal.classList.add("vali");
        Swal.fire({
            'title': 'Faltan campos por rellenar',
            'text': 'Por favor revise los campos resaltados',
            'icon': 'warning'
        });
     }else{

        nom.classList.remove("vali");
        apell.classList.remove("vali");
        tel.classList.remove("vali");
        dirc.classList.remove("vali");
        postal.classList.remove("vali");
        Swal.fire({
          'title': 'Compra realizada con éxito',
          'text': 'Sus compras se enviaran dependiendo del envío seleccionado',
          'icon': 'success'
        });
    }
   
}; 