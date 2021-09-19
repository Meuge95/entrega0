
const ORDER_ASC_BY_COST = "MenorPrecio";
const ORDER_DESC_BY_COST = "MayorPrecio";
const ORDER_BY_PROD_SOLDCOUNT = "SoldCont.";
var categoriesArray = [];



function showProducts(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <a href="product-info.html">
        <div class="row" >
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1"><b>`+ product.name + `</b></h4>
                        <small class="text-muted">` + product.soldCount + ` vendidos</small>
                    </div>
                    <p class="mb-1"> `+ product.description + `</p>
                    <div class=" w-100 "><b>` + product.currency + " " + product.cost + ` </b> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </a>
        `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function (e) {

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro los productos ordenadas
            showProducts(categoriesArray);
        }
    });
});


function ordenarA() {

    categoriesArray.sort((a, b) => {
        if (a.cost > b.cost) {
            return 1;
        }
        if (a.cost < b.cost) {
            return -1;
        } else {
            return 0;
        }
    });
    showProducts(categoriesArray);

};

function ordenarD() {
    //categoriesArray = filtrar();  {Esto no anda cuando ejecuto el buscar o filtrar}
    categoriesArray.sort((a, b) => {
        if (a.cost < b.cost) {
            return 1;
        }
        if (a.cost > b.cost) {
            return -1;
        } else {
            return 0;
        }
    });
    showProducts(categoriesArray);

};

function ordenarCant() {

    categoriesArray.sort((a, b) => {
        if (a.soldCount < b.soldCount) {
            return 1;
        }
        if (a.soldCount > b.soldCount) {
            return -1;
        } else {
            return 0;
        }
    });
    showProducts(categoriesArray);

};

function filtrar() {

    var min = parseInt(document.getElementById('filtrarMin').value);
    var max = parseInt(document.getElementById('filtrarMax').value);
    let filas = [];
    for (let product of categoriesArray) {
        if (product.cost >= min && product.cost <= max) {
            filas.push(product);
        }

    }
    showProducts(filas);
    // return filas;  {Esto no anda cuando ejecuto el buscar o filtrar}
}

function misterMusculo() {

    document.getElementById('filtrarMin').value = "";
    document.getElementById('filtrarMax').value = "";

    showProducts(categoriesArray);
}
let productoFiltrados = [];

function buscar() {
    let textoEscrito = document.getElementById('buscador').value;

    let productoFiltrados = categoriesArray.filter(product => {
        return product.name.toLowerCase().indexOf(textoEscrito.toLowerCase()) > -1;
    })
    showProducts(productoFiltrados);

};


document.getElementById('buscador').addEventListener('keyup', () => {

    buscar();


});