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
function keyPressed(event){
    if(event.keyCode === 13){
        //entrer pressed;
    }else{
        //extraeInfoApi(document.getElementById("address").value);
    }
}

function muestraPais(){
    document.getElementById("address").addEventListener("change", () => {
        extraeInfoApi(document.getElementById("address").value)
    });
}

function extraeInfoApi(pais){
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
    let address = document.getElementById("shipping");
    if(primerPais != null){
        address.placeholder = primerPais.name;
    }
}

muestraPais();