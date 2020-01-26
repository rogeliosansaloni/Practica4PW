var fichero;

//Array con la información de todas las gafas del listado
var array_gafas;

const token = '5e18ba3a6b97a';


fetch('http://puigpedros.salle.url.edu/pwi/glasses/api/list/' + token)
.then(function(response) {
    return response.json();
    
})
.then(function(myJson) {
    fichero = myJson;             
});

class Gafa {
    constructor (data_gafa) {
        this.id = data_gafa.id;
        this.title = data_gafa.title;
        this.description = data_gafa.description;
        this.price = data_gafa.price;
        this.images = data_gafa.images;
        this.colors = data_gafa.colors;
        this.details = data_gafa.details;
        this.bgColor = data_gafa.bgColor;
    }
}

window.onload = function() {

    document.getElementById("menu2").style.display = 'none';

    document.getElementById("x").addEventListener('click', function () {
        if (this.classList.contains('clicked')) {
          this.classList.remove('clicked');
            document.getElementById("head").classList.add("full");
            document.body.style.backgroundColor = "white";
            document.body.style.opacity = 1;
            
            document.getElementById("menu2").style.opacity = "0";
            document.getElementById("logo").style.opacity = "1";
            document.getElementById("lupa").style.opacity = "1";
            document.getElementById("contenido").style.display = 'block';
            document.getElementById("menu2").style.display = 'none';


        } else {
            document.getElementById("menu2").style.display = 'flex';
            document.getElementById("contenido").style.display = 'none';

            var n_gafas = pide();
            document.getElementById("head").classList.remove("full");
            //Reducción de la opacidad del fondo para simular efecto
            document.body.style.opacity = 0.3;
            document.getElementById("menu2").style.opacity = "1";
            document.getElementById("logo").style.opacity = "0";
            document.getElementById("lupa").style.opacity = "0";
            actualizaMenu(n_gafas);

            this.classList.add('clicked');
        }
      });

}


  function actualizaMenu (n_gafas) {
    document.getElementById("m1").innerHTML = "HOME";
    document.getElementById("m2").innerHTML = "LIST (" + n_gafas + ")";
    document.getElementById("m3").innerHTML = "SEARCH";
    var n_cesta = recuperaCesta();
    if (n_cesta == null) {
        document.getElementById("m4").innerHTML = "CART (0)";
    } else {
        document.getElementById("m4").innerHTML = "CART (" + n_cesta + ")";
    }
          
    document.getElementById("m5").innerHTML = "FAVORITE";  
  }

  

function pide () {
    
    var url = 'http://puigpedros.salle.url.edu/pwi/glasses/api/list/' + token;
    function get(url) {

        fetch(url)
            .then(function(response) {
                return response.json();
                
            })
            .then(function(myJson) {
                fichero = myJson;             
        });

    };

    get(url);
    
    array_gafas = new Array();
    
    for (var i = 0; i < fichero.data.glasses.length; i++) {
        array_gafas[i] = new Gafa(fichero.data.glasses[i]);
    }

    return fichero.data.glasses.length;
}

function recuperaCesta () {
    var cesta_json = localStorage.getItem('Cesta');
    if (cesta_json == null) {
        return null;
    } else {
        var cesta = JSON.parse(cesta_json);
        var r = 0;
        for (var i = 0; i < cesta.length; i++) {
            r += cesta[i].qty;
        }
        return r;
    }
}

