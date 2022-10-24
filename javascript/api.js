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
  

//#region  POST

const form = document.getElementById("form");
var formEl= document.getElementById("form").elements;


var cate=0

function selection() {
 let milk= document.getElementById('milk');
 milk.addEventListener('click', function(e){
    cate=1;
    console.log(cate)
 })

 let meat= document.getElementById('meat');

 meat.addEventListener('click', function(e){
    cate=2;
    console.log(cate)
 })

 let double= document.getElementById('double');

 double.addEventListener('click', function(e){
    cate=3;
    console.log(cate)
 })
}


function clear() {
   let btn = document.querySelector('#btn')
   let inputs= document.querySelectorAll('input')
   btn.addEventListener('click',(e)=>[
     inputs.forEach(input => input.value='')
   ])
}
console.log(form);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form)
    let name1 = data.get("name");
    let image1 = data.get("image")

    selection()




    let vaca = {
        name: name1,
        image: image1,
        categoryId: cate
    }
    fetch("http://localhost:5000/Cows", {
            method: 'POST',
            body: JSON.stringify(vaca),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((res) => res.json())
        .then((res1) => console.log(res1))

getCows(cate)

})
//#endregion

