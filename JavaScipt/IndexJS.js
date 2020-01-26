
document.getElementById("head").addEventListener('load',function(e){
    let doc = document.getElementById("head").contentWindow.document;

    doc.getElementById("logo").addEventListener("click", () => {
        document.getElementById("list").src = "./HTML/index.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();
        });
    });

    doc.getElementById("m1").addEventListener("click", () => {
        document.getElementById("list").src = "./HTML/index.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();
        });
        //document.location.reload();
    });
    doc.getElementById("m5").addEventListener("click", () => {
        document.getElementById("list").src = "./HTML/index.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();
        });
    });

    doc.getElementById("m2").addEventListener("click", () => {
        document.getElementById("list").src = "./HTML/index.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();
        });
    });

    doc.getElementById("m4").addEventListener("click", () => {
        document.getElementById("list").src = "./HTML/Cesta.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();
        });
    });

    doc.getElementById("x").addEventListener("click", () => {

        if(document.body.classList.contains("initialBody")){
            document.body.classList.remove("initialBody");
            document.body.classList.add("bigHeader");
            document.getElementById("header").height = "100%";
        }else{
            document.body.classList.remove("bigHeader");
            document.body.classList.add("initialBody");
            document.getElementById("header").height = "40vh";
        }
    })
});

document.getElementById("list").addEventListener('load', function(e){

    document.getElementById("list").contentWindow.botonBuy = () => {

    };
    document.getElementById("list").contentWindow.checkout = () => {

        document.getElementById("list").src = "./HTML/Form.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();

        });

    };

    document.getElementById("list").contentWindow.vuelta = () => {
        document.getElementById("list").src = "./HTML/List.html";
        document.getElementById("list").addEventListener('load',() => {
            document.location.reload();

        });
    }


});
