class GafaDetalle{
    constructor (id, title, description, price, images, colors, details, bgColor){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.images = images;
        this.colors = colors;
        this.details = details;
        this.bgColor = bgColor;
    }

    getId(){
        return this.id;
    }

    getTitle(){
        return this.title;
    }

    getDescription(){
        return this.description;
    }

    getPrice(){
        return this.price;
    }

    getImage(){
        return this.images[0];
    }

    getColors(){
        return this.colors;
    }

    getDetails(){
        return this.details;
    }

    getBgColor(){
        return this.bgColor;
    }

}


var botonBuy = () => {
};

var openDetails = () => {};

function extraeListado(){
    const token = '5e18ba3a6b97a';
    const url_listado= 'http://puigpedros.salle.url.edu/pwi/glasses/api/list/' + token;
    fetch(url_listado)
        .then(function(response) {
            return response.json();  
        })
        .then(function(listado) {
            muestraListado(listado);
    });
}


function muestraListado (listado) {
    document.getElementById("menu2").style.display = 'none';
    //creamos un nodo que contendrá todas las gafas
    var items = document.createElement("SECTION");
    items.className = "items";
    var cantidadGafas = listado.data.glasses.length;
    for (var i = cantidadGafas - 1; i >= 0 ; i--) {
        //gafa será el padre
        var gafaNueva = document.createElement("ARTICLE");
        gafaNueva.className = "item ";

        //imagen, nombre y precio seran sus hijos
        //imagen
        var imagen = document.createElement("IMG");
        imagen.src = listado.data.glasses[i].images[0];
        imagen.className = "imagenGafas";
        gafaNueva.appendChild(imagen);

        //tabla para el nombre y el precio
        var tabla = document.createElement("TABLE");
        tabla.className = "tableItem";
        var fila = tabla.insertRow();
        fila.className = "tableRow";

       //nombre
        var primeraCelda = fila.insertCell();
        primeraCelda.appendChild(document.createTextNode(listado.data.glasses[i].title));

        //precio
        var segundaCelda = fila.insertCell();
        segundaCelda.className = "columnaItem";
        segundaCelda.appendChild(document.createTextNode(listado.data.glasses[i].price + " €"));

        gafaNueva.appendChild(tabla);

        var link = document.createElement('a');
        var linkText = document.createTextNode("Más información");
        link.appendChild(linkText);
        link.className = "link";
        link.id = "link";
        var id = listado.data.glasses[i].id;
        function cambiaDetalle(id) {
            return function() {extraeDetalle(id)};
        }
        link.addEventListener("click",cambiaDetalle(id));
        gafaNueva.appendChild(link);
        gafaNueva.style.backgroundColor = listado.data.glasses[i].bgColor;
        items.appendChild(gafaNueva);
    }
    document.getElementById("detalle").innerHTML= "";
    document.getElementById("detalle").style.display = "none";
    document.getElementById("listado").appendChild(items);
    document.getElementById("listado").style.display = "block";
    var historial = {foo: "bar"};
    history.pushState(historial, "", "#listado");
}

function extraeDetalle (id) {
    openDetails();
    const token = '5dffb1e5acd7b';
    var url_detalle= 'http://puigpedros.salle.url.edu/pwi/glasses/api/detail/' + token + '/' + id;
    fetch(url_detalle)
        .then(function(response) {
            return response.json();  
        })
        .then(function(detalle) {
            muestraDetalle(detalle);
    });
}

function muestraDetalle (detalle) {
    //creamos un nuevo item
    var gafaDetalle = document.createElement("ARTICLE");

    var gafa = new GafaDetalle(detalle.data.id, detalle.data.title, detalle.data.description, detalle.data.price, detalle.data.images, detalle.data.colors, detalle.data.details, detalle.data.bgColor);
    gafaDetalle.className = "itemDetalle";
    gafaDetalle.style.backgroundColor = gafa.getBgColor();
    
    //creamos la cabecera
    var cabecera = document.createElement("ARTICLE");
    cabecera.className = "cabecera";
    //creamos el nombre de la gafa
    var tituloPrincipal = document.createElement("DIV");
    tituloPrincipal.appendChild(document.createTextNode(gafa.getTitle()));
    tituloPrincipal.className = "tituloPrincipal";
    cabecera.appendChild(tituloPrincipal);
    //creamos el boton like
    var like = document.createElement("object");
    like.type="image/svg+xml";
    like.src = "../images/corazon.svg";
    like.className = "like";
    cabecera.appendChild(like);
    gafaDetalle.appendChild(cabecera);

    //creamos la seccion de las gafas
    var gafas = document.createElement("SECTION");
    gafas.className = "gafas";
    //creamos la imagen de las gafas
    var imagenGafas = document.createElement("IMG");
    imagenGafas.className = "imagenGafasDetalle";
    imagenGafas.src = gafa.getImage();
    gafas.appendChild(imagenGafas);
    gafaDetalle.appendChild(gafas);

    //creamos la tabla para el precio y versiones de la gafa
    var tablaGafa = document.createElement("TABLE");
    tablaGafa.className = "tableItemDetalle";

    //fila 1 tabla gafa
    var fila1TGafa = tablaGafa.insertRow();
    fila1TGafa.className = "fila1t1";
    //columna 1 fila 1
    var col1fila1TGafa = fila1TGafa.insertCell();
    col1fila1TGafa.appendChild(document.createTextNode("VERSIONS & COLORS"));
    //columna 2 fila 1
    var col2fila1TGafa = fila1TGafa.insertCell();
    col2fila1TGafa.appendChild(document.createTextNode("PRICE"));

    //fila 2 tabla gafa
    var fila2TGafa = tablaGafa.insertRow();
    fila2TGafa.className = "fila2t1";
    //columna 1 fila 2
    var col1fila2TGafa = fila2TGafa.insertCell();
    var select = document.createElement("SELECT");
    select.className = "select";
    for(var i = 0; i < gafa.getColors().length; i++){
        let option = document.createElement("OPTION");
        option.className = "option";
        option.text = gafa.getColors()[i];
        select.add(option);
    }
    col1fila2TGafa.appendChild(select);

    //columna 2 fila 2
    var col2fila2TGafa = fila2TGafa.insertCell();
    col2fila2TGafa.appendChild(document.createTextNode(gafa.getPrice() + " €"))
    gafaDetalle.appendChild(tablaGafa);

    //Section info
    var info = document.createElement("SECTION");
    info.className = "info";
    //Section filaBotones
    var filaBotones = document.createElement("SECTION");
    filaBotones.className = "filaBotones";
    //Section boton
    var botones = document.createElement("SECTION");
    botones.className = "botones";


    //Button BUY
    //Creamos la cesta

    var cesta = JSON.parse(localStorage.getItem('Cesta'));
    if(cesta === null){
        cesta = new Array(0);
    }

    function añadirCesta(id) {
        let indice = cesta.findIndex((e) => {
            return e["id"] === id;
        },0);

        if (indice < 0) {
            cesta.push({id:id, qty:1});
        } else {
            cesta[indice].qty++;
        }

        //añadimos la cesta al localStorage
        localStorage.clear();
        localStorage.setItem('Cesta', JSON.stringify(cesta));
    }
    
    var buttonBuy = document.createElement('BUTTON');
    var id = gafa.getId();
    buttonBuy.addEventListener("click", function(){añadirCesta(id)});
    buttonBuy.className = "boton";
    buttonBuy.appendChild(document.createTextNode("BUY"));
    buttonBuy.addEventListener('click', () => {
        botonBuy();
    });
    botones.appendChild(buttonBuy);
    //Button ATRÁS
    function cambiaListado() {
        return function() {extraeListado()};
    }
    var buttonBack = document.createElement('BUTTON');
    buttonBack.className = "boton";
    buttonBack.appendChild(document.createTextNode("BACK"));
    buttonBack.addEventListener("click", cambiaListado());
    botones.appendChild(buttonBack);
    filaBotones.appendChild(botones);
    info.appendChild(filaBotones);

    //DIV Details
    var details = document.createElement("DIV");
    details.className = "titulo";
    details.appendChild(document.createTextNode("DETAILS"));
    info.appendChild(details);
    
    //Tabla para los details
    var tablaDetails = document.createElement("TABLE");
    tablaDetails.className = "tablaDetails";

    //fila 1 tabla details
    var fila1TDetails = tablaDetails.insertRow();
    fila1TDetails.className = "fila1t2";
    //columna 1 fila 1
    var col1fila1TD = fila1TDetails.insertCell();
    col1fila1TD.appendChild(document.createTextNode(gafa.getDetails().lensesDiameter));
    col1fila1TD.className = "celda";

    //columna 2 fila 1
    var col2fila1TD = fila1TDetails.insertCell();
    col2fila1TD.appendChild(document.createTextNode(gafa.getDetails().bridgeMaterial));
    col2fila1TD.className = "celda";

    //columna 3 fila 1
    var col3fila1TD = fila1TDetails.insertCell();
    col3fila1TD.appendChild(document.createTextNode(gafa.getDetails().rimsMaterial));
    col3fila1TD.className = "celda";

    //fila 2 tabla details
    var fila2TDetails = tablaDetails.insertRow();
    fila2TDetails.className = "fila2t2";
    //columna 1 fila 2
    var col1fila2TD = fila2TDetails.insertCell();
    col1fila2TD.appendChild(document.createTextNode("Lenses diameter"));
    col1fila2TD.className = "celda";

    //columna 2 fila 2
    var col2fila2TD = fila2TDetails.insertCell();
    col2fila2TD.appendChild(document.createTextNode("Bridge material"));
    col2fila2TD.className = "celda";

    //columna 3 fila 2
    var col3fila2TD = fila2TDetails.insertCell();
    col3fila2TD.appendChild(document.createTextNode("Rims material"));
    col3fila2TD.className = "celda";
    info.appendChild(tablaDetails);
    
    //DIV DESCRIPTION
    var description = document.createElement("DIV");
    description.className = "titulo";
    description.appendChild(document.createTextNode("DESCRIPTION"));
    info.appendChild(description);

    //Description text
    var descriptionText = document.createElement("P");
    descriptionText.className = "texto";
    descriptionText.appendChild(document.createTextNode(gafa.getDescription()));
    info.appendChild(descriptionText);

    gafaDetalle.appendChild(info);

    document.getElementById("listado").innerHTML= "";
    document.getElementById("listado").style.display = "none";
    document.getElementById("detalle").appendChild(gafaDetalle);
    document.getElementById("detalle").style.display = "block";
    var historial = {foo: "bar"};
    history.pushState(historial, "", "#detalle");
}
