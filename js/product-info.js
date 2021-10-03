var product = {};
var comentarios = {};
var relacionados = {};

function showImagesProduct(array) {

    let htmlContentToAppend = `<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">`;
    var stringActivo = " active";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item` + stringActivo +`">
        <img src="${imageSrc}" class="d-block w-100" alt="...">
      </div>
        `
      stringActivo = "";
        

        
    }

    htmlContentToAppend +=  ` </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div> `
    document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}

function showcComments(array) {

    let htmlContentToAppend = "";
    
    htmlContentToAppend += `<div class="list-group" >`;

    for (let i = 0; i < array.length; i++) {
        let comments = array[i];
        let estrellas = "";
        for (let i=1; i<=5; i++){
    
            if (i<=comments.score){
                estrellas += '<i class="fas fa-star "></i>';
                
            }else {
                estrellas +='<i class="far fa-star "></i>';
            }
    
    
        }
        htmlContentToAppend += `

        <div class="list-group-item list-group-item-action flex-column align-items-start ">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1"><b>` + comments.user +`</b> </h5>
              <small> `+ comments.dateTime + `</small>
            </div>
            <small>` + estrellas + `</small>
            <p class="mb-1">` + comments.description + `</p>
        </div>
        `
       
    } 
    htmlContentToAppend += `</div>`;
    document.getElementById("comments").innerHTML = htmlContentToAppend;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productSoldCount");
            let productCriteriaHTML = document.getElementById("productCriteria");


            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCountHTML.innerHTML = product.soldCount;
            productCriteriaHTML.innerHTML = product.currency + " " + product.cost;

            //Muestro las imagenes en forma de galería
            showImagesProduct(product.images);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {

            comentarios = resultObj.data;

           

            showcComments(comentarios);
        }

    })
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            productosRelacionados = resultObj.data;

            showRelacionados(product,productosRelacionados);


        }
    })
});
 
function showRelacionados(arrayRelacionados,arrayProductos){
   
    let htmlContentToAppend = "";

    for (let relacionado of arrayRelacionados.relatedProducts){
   
     htmlContentToAppend += `

       <div id="mix" class="col-lg-3 col-md-4 col-6" >
          <div id="mix2" class="d-block mb-4 h-100 img-thumbnail text-center">
                <img class="img-fluid" src="${arrayProductos[relacionado].imgSrc}" alt="">
                <h4><b> `+ arrayProductos[relacionado].name+`</b></h4>
                <small><b>`+ arrayProductos[relacionado].currency + " " + arrayProductos[relacionado].cost + `</b> </small>
            </div>
             
        </div>`
            
    
    }

   document.getElementById("productosRelacionadosGally").innerHTML = htmlContentToAppend;
}

function calificar(num){ 
   
    calificacion = num;
    let estrellas = "Califica: ";
    for (let i=1; i<=5; i++){

        if (i<=num ){
            estrellas += `<i class="fas fa-star" onclick="calificar(`+ i +`);"></i>`;
            
        }else {
            estrellas +=`<i class="far fa-star"  onclick="calificar(`+ i +`);"></i>`;
        }


    }
    document.getElementById('star').innerHTML= estrellas;
   


}


var calificacion = 1;


function comentar (){
    let comment = {};
     
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    var tiempo =  new Date();
    var año = tiempo.getFullYear();
    var mes = tiempo.getMonth() +1;
    var dia = tiempo.getDate();
    var hour = tiempo.getHours();
    var minute = tiempo.getMinutes();
    var second = tiempo.getSeconds();
    temp = año;
    /* if (mes < 10){  //Esto seria la version larga de los if's de abajito
        temp+= '-0';
    }else {
        temp += '-';
    } 
      temp += mes; */
    temp += ((mes < 10) ? '-0' : '-') + mes;
    temp += ((dia < 10) ? '-0' : '-') + dia;
    temp += " " ;
    temp += ((hour < 10) ? '0' : '') + hour;
    temp += ((minute < 10) ? ':0' : ':') + minute;
    temp += ((second < 10) ? ':0' : ':') + second;
    
    
    comment.user = usuario.nombre;

    comment.dateTime = temp;
    comment.score = calificacion;
    comment.description = document.getElementById('descripcion').value;


    comentarios.push(comment);
    showcComments(comentarios);
}

