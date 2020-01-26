const token = "5e040aa11910c";

/*async function getCountryFromCapital(){
    let data;
    await fetch("https://restcountries.eu/rest/v2/name/"+pais).then((r) => r.json()).then((r) => data = r);
    return data;
}
   //console.log( document.childNodes);

    document.getElementById("address").addEventListener("onkeypress",(e) => {
        console.log(e.target.value);
    });

getCountryFromCapital().then((r) => console.log(r));
*/
let paisActual = "";

function keyPressed(event){
    if(event.keyCode === 13){
        document.getElementById("address").value = paisActual;
        document.getElementById("shipping").focus();
    }else{
        extraeInfoApi(document.getElementById("address").value);
    }
}

function muestraPais(){
    document.getElementById("address").addEventListener("change", () => {
        extraeInfoApi(document.getElementById("address").value)
    });
}

function extraeInfoApi(pais){
    if(pais==null || pais == undefined || pais=="") return;
    const url_pais= 'https://restcountries.eu/rest/v2/name/' + pais;
    fetch(url_pais)
        .then(function(response) {
            return response.json();
        }).then((r) => {
            console.log(r);
            actualizaAddress(r);
    })
}

function actualizaAddress(json){
    let primerPais = json[0].name;
    if(primerPais != null){
        alert(primerPais);
        paisActual = primerPais;
    }
}

muestraPais();