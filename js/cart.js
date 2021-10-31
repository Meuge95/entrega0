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
        totals += array.articles[i].unitCost * array.articles[i].count + (array.articles[i].unitCost * 0.01);  ;
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

        tabla += "<tr> <th scope='row'><img height='200' src=" + array.articles[i].src + "></th>  <td class='align middle'>" + array.articles[i].name  + "</td>   <td class='align middle'><input  type='number'  step='1' min='1'  id='countD"+ i +"' onchange='actualizar("+ i +")' value="+ array.articles[i].count +"></td>     <td class='align middle' id='priceD"+ i +"' >"+ array.articles[i].currency +" " + array.articles[i].unitCost + "</td>   </tr>";
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
        totals += array.articles[i].unitCost * array.articles[i].count + (array.articles[i].unitCost * 0.01);  ;
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
        totals += articles.articles[i].unitCost * articles.articles[i].count + (articles.articles[i].unitCost * 0.01);
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
     totals += articles.articles[i].unitCost * articles.articles[i].count + (articles.articles[i].unitCost * 0.01);
 }
 subtotal = subtotals;
 envi = envios
 total = totals;
showCarrito(articles);

}

