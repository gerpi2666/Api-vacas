//import { getCows } from "./api";

const form = document.getElementById("form");
var formEl = document.getElementById("form").elements;
var cate = 0

function selection() {
    let milk = document.getElementById('milk');
    milk.addEventListener('click', function (e) {
        cate = 1;
        console.log(cate)
    })

    let meat = document.getElementById('meat');

    meat.addEventListener('click', function (e) {
        cate = 2;
        console.log(cate)
    })

    let double = document.getElementById('double');

    double.addEventListener('click', function (e) {
        cate = 3;
        console.log(cate)
    })
}

selection()


function getCows(ide) {
    let a = "" + ide;
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {

            const tabla = document.querySelector("#bodyHtml");
            let innerhtml = "";

            for (var i = 0; i < res.length; i++) {
                if (res[i].categoryId == a) {

                    innerhtml += "<tr><td>" + res[i].name + "</td><td>" + "<img class='img1' src=\"" + res[i].image + "\">" + "</td></tr>"
                }
            }

            tabla.innerHTML = innerhtml;
        })
}


console.log(form);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form)
    let name1 = data.get("name");
    let image1 = data.get("image")

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

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    getCows(cate)
})