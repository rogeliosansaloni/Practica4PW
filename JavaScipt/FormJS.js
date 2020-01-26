const token = "5e040aa11910c";

let paisActual = "";
let paypal = false;
let visa = false;
let itemBorrado = false;

var vuelta = () => {

};
function keyPressed(event){
    if(event.keyCode === 13){
        document.getElementById("address").value = paisActual;
        document.getElementById("shipping").focus();
    }else{
        extraeInfoApi(document.getElementById("address").value+String.fromCharCode(event.keyCode));
    }
}

function extraeInfoApi(pais){
    if(pais==null || pais == undefined || pais=="") return;
    const url_pais= 'https://restcountries.eu/rest/v2/name/' + pais;
    fetch(url_pais)
        .then(function(response) {
            return response.json();
        }).then((r) => {
            actualizaAddress(r);
    }).catch(() => {});
}

function actualizaAddress(json){
    let primerPais = json[0].name;
    console.log(primerPais);
    if(primerPais != null && primerPais != undefined && primerPais != ""){
        alert(primerPais);
        paisActual = primerPais;
    }
}

function listenersMetodosPago(){
    document.getElementById("botonPaypal").addEventListener("click", () => {paypal = true; visa = false;})
    document.getElementById("botonVisa").addEventListener("click", () => {paypal = false; visa = true;})
}

function comprobarComplete(){
    if(paypal==false && visa==false){
        alert("Selecciona un método de pago.");
    }
    else if(!itemBorrado){
        itemBorrado = true;
        document.getElementById("precio").innerHTML = "0 €";
        console.log("esto si");
        localStorage.removeItem("Cesta");
        localStorage.removeItem("precioTotal");
        vuelta();
    }
}

function listenerComplete(){
    document.getElementById("botonComplete").addEventListener("click", comprobarComplete);
}

function cambioFormulario(){
    let price = localStorage.getItem("precioTotal");
    if(price == null) document.getElementById("precio").innerHTML = "0 €";
    else document.getElementById("precio").innerHTML = price + " €";

    listenersMetodosPago();
    listenerComplete();
}

