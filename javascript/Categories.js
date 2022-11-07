import {FillTable} from './Util.js';


//cargar categorias 
function categorias() {
    fetch("http://localhost:5000/Category")
        .then((res) => res.json())
        .then((res) => {

            var ul = document.querySelector("#lista");
            var inner = "";

            for (let i = 0; i < res.length; i++) {

                inner += "<li class=\"dropdown-item categoria\" value=\"" + res[i].id + "\">" + res[i].name + "</li>";

            }

            ul.innerHTML = inner;
            SetEvents();

        });
}

categorias();


function SetEvents () {

    const categories = document.querySelector("#lista").children;

    for (let i = 0; i < 3; i++) {
        let element = categories.item(i);
        element.addEventListener("click", function(){
            FillTable(element.value);
        });
    }
}