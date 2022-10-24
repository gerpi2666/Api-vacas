categorias()



//cargar categorias 
function categorias(){
    fetch("http://localhost:5000/Category")
    .then((res)=> res.json())
    .then((res)=>{
        
        var inner="";
        var ul= document.querySelector("#lista")

        for (let i = 0; i < res.length; i++) {
       
            inner +=   "<li class=\"dropdown-item\" onClick=\"getCows(" + res[i].id + ")\">" + res[i].name + "</li>";
        
        }
    
        ul.innerHTML= inner;    
   

    })
}

let currentIndex=0;







    function getCows(ide){
    let a= ""+ide;
    fetch("http://localhost:5000/Cows")
    .then((res)=> res.json())
    .then((res)=>{
        
        const tabla = document.querySelector("#bodyHtml");
        let innerhtml = "";

        for(var i = 0; i < res.length; i++){
            if(res[i].categoryId == a){
                
            innerhtml += "<tr><td>" + res[i].name + "</td><td>" + "<img class='img1' src=\"" + res[i].image + "\">" + "</td></tr>"
            }
        }

        tabla.innerHTML = innerhtml;
    })
}




function deleteCow(id){

    fetch("http://localhost:5000/Cows/"+id, {
        method: 'DELETE',
      });

}
  


//#endregion

