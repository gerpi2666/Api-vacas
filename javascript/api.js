categorias()



//cargar categorias 
function categorias() {
    fetch("http://localhost:5000/Category")
        .then((res) => res.json())
        .then((res) => {

            var inner = "";
            var ul = document.querySelector("#lista")

            for (let i = 0; i < res.length; i++) {

                inner += "<li class=\"dropdown-item\" onClick=\"xmlHttpRequest(" + res[i].id + ")\">" + res[i].name + "</li>";

            }

            ul.innerHTML = inner;


        })
}

let currentIndex = 0;







function getCows(ide) {
    let a = "" + ide;
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {
            const tabla = document.querySelector("#bodyHtml");
            let innerhtml = "";

            for (var i = 0; i < res.length; i++) {
                if (res[i].categoryId == a) {
                    innerhtml+= `
                    <tr>
                        <td>${res[i].name}</td>
                        <td>${res[i].image}</td>
                        <td class="text-center"><button class="btn btn-primary">Editar</button> <button class="btn btn-warning">Eliminar</button></td>
                    
                    `
                }
            }

            tabla.innerHTML = innerhtml;
        })
}





//export {getCows};


//#endregion


// function xmlHttpRequest(ide){

//     let res = new XMLHttpRequest();

//     res.onreadystatechange = function(){
//         if(this.readyState == 4 && this.status == 200){
            
//             const tabla = document.querySelector("#bodyHtml");
            
//             let json = JSON.parse(this.responseText);

//             console.log(json);

//             let innerhtml = "";

//             for (var i = 0; i < json.length; i++) {
//                 if (json[i].categoryId == ide) {
//                     innerhtml+= `
//                     <tr>
//                         <td>${json[i].name}</td>
//                         <td><img src=\"${json[i].image}\"></td>
//                         <td class="text-center"><button class="btn btn-primary">Editar</button> <button class="btn btn-warning">Eliminar</button></td>
                    
//                     `
//                 }
//             }

//             tabla.innerHTML = innerhtml;
//         }
//     };

//     res.open("GET", "http://localhost:5000/Cows", true);
//     res.send();
// }