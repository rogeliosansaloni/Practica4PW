const token = "5e040aa11910c";

class Gafas{
    constructor(id,amount){
        this.id = id;
        this.amount = amount;
        this.title = "";
        this.price = "";
        this.image = "";
        console.log("Test");
    }

    async loadGlasses(){
        console.log("Test2");
        console.log("http://puigpedros.salle.url.edu/pwi/glasses/api/detail/"+token+"/"+this.id);
        await fetch("http://puigpedros.salle.url.edu/pwi/glasses/api/detail/"+token+"/"+this.id)
        .then((r) => r.json()).then((r)=>{
            console.log(r);
            this.title = r["data"]["title"];
            this.price = r["data"]["price"];
            this.image = r["data"]["images"][0];
        });
    }

    getInnerHTML(){
        return "<section class=\"data\" itemprop=\"orderedItem\" itemscope itemtype=\"http://schema.org/OrderItem\" >"+
            "<input class=\"amount\" type=\"number\" step=\"1\" min=\"0\" value="+this.amount+" itemprop=\"orderQuantity\" id="+this.id+"_input />"+
            "<img class=\"picutre\" src="+this.image+" alt="+this.title+" itemprop=\"image\" />"+
            "<h3 class=\"title name\" itemprop=\"name\">"+this.title+"</h3>"+
            "<p  class=\"title price\" itemprop=\"price\">"+this.price+"€</p>"+
        "</section>"
    }
    
    updateTriggers(){
        document.getElementById(this.id+"_input").addEventListener("onchange",this.updateAmount,false);
    }

    updateAmount(am){
        this.amount  = am.value;
    }

    getTotalPrice(){
        return this.price*this.amount;
    }
    
};

try{
    let localData = JSON.parse(localStorage.getItem("carrito"));
    let gafas = [];
    let promises = [];
    localData.forEach((gafa) => {
        var gaf = new Gafas(gafa.id,gafa.qty);
        promises.push(gaf.loadGlasses());
        gafas.push(gaf);
    });
    Promise.all(promises).then(()=>{
        let items = document.getElementById("CartElements");
        let price = 0;
        console.log(gafas);
        gafas.forEach((gafa) => {
            price += gafa.getTotalPrice();
            items.innerHTML += items.innerHTML + gafa.getInnerHTML();
            gafa.updateTriggers();
        });
        document.getElementById("total").value = ""+price;
        document.getElementById("checkoutbutton").addEventListener("onclick",()=>{
            gafas.forEach((gafa) => {
               fetch("http://puigpedros.salle.url.edu/pwi/glasses/api/remove/"+token,{
                    method: "POST",
                    body: "{\"id\": \""+gafa.id+"\"}"
                });
                localStorage.removeItem("carrito");
                //Change to homepage 
            })
        },false);
    });



}catch(exception){
    console.log(exception);
    //TODO sacar de esta página
}
