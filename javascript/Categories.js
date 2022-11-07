
categorias();

//cargar categorias 
function categorias() {
    fetch("http://localhost:5000/Category")
        .then((res) => res.json())
        .then((res) => {

            var inner = "";
            var ul = document.querySelector("#lista")

            for (let i = 0; i < res.length; i++) {

                inner += "<li class=\"dropdown-item\" value=\"res[i].id\">" + res[i].name + "</li>";

            }

            ul.innerHTML = inner;

            ul.childNodes.forEach(element => {
                console.log(element);        
            });

        });
}

categorias();