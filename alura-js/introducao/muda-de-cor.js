// Retorna todos os elementos <tr> da página dentro de um array
var trs = document.getElementsByTagName("tr");

percorreArray(trs, function(tr){
    
    tr.addEventListener("mouseover", function(){
        this.setAttribute("bgcolor", "grey");
    })
});