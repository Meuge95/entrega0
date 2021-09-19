var product = {};
var comentarios = {};

function showImagesProduct(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
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
});
 
function calificar(num){ 
    //let num = parseInt(document.getElementById('cant').value);
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
    temp += ((mes < 10) ? '-0' : '-') + mes;
    temp += ((dia < 10) ? '-0' : '-') + dia;
    temp += " " ;
    temp += ((hour < 10) ? '0' : '') + hour;
    temp += ((minute < 10) ? ':0' : ':') + minute;
    temp += ((second < 10) ? ':0' : ':') + second;
    
    //alert (usuario.nombre);
    comment.user = usuario.nombre;

    comment.dateTime = temp;
    comment.score = calificacion;
    comment.description = document.getElementById('descripcion').value;


    comentarios.push(comment);
    showcComments(comentarios);
}

/*function agrandar(num){ 
    calificacion = num;
    let estrellas = "Califica: ";
    for (let i=1; i<=5; i++){

        if (i<=num ){
            estrellas += `<i class="fas fa-star`;
            
        }else {

            estrellas +=`<i class="far fa-star`;
        }
        if (i == num) {
            estrellas += ` fa-2x"`;
       
        } else {
            estrellas += `"`;
        }
      estrellas += ` onclick="calificar(`+ i +`);"></i>`;
    }
    document.getElementById('star').innerHTML= estrellas;
   


}*/