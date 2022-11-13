export function FillTable(ide) {
    let a = ide;
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {
            const tabla = document.querySelector("#bodyHtml");
            let innerhtml = "";

            for (var i = 0; i < res.length; i++) {
                if (res[i].categoryId == a) {
                    innerhtml += `
                    <tr>
                        <td class="rowT">${res[i].name}</td>
                        <td class="rowT"><img class="img1" src="${res[i].image}"></td>
                        <td class="rowT text-center"><button class="btn btn-primary" id="btnEdit1" >Editar</button> <button class="btnDelete btn btn-danger">Eliminar</button></td>
                    
                    `
                }
            }

            tabla.innerHTML = innerhtml;
        })
}

export function GetDataModal(elemet, event, selector, handler) {
    elemet.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
};

//export {getCows};


//#endregion

// ====================================================================

function xmlHttpRequest(ide) {

    let res = new XMLHttpRequest();

    res.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            const tabla = document.querySelector("#bodyHtml");

            let json = JSON.parse(this.responseText);

            let innerhtml = "";

            for (var i = 0; i < json.length; i++) {
                if (json[i].categoryId == ide) {
                    innerhtml += `
                        <tr>
                            <td class="rowT">${json[i].name}</td>
                            <td class="rowT"><img class="img1" src="${json[i].image}"></td>
                            <td class="rowT text-center"><button class="btnEdit btn btn-primary" onclick="showModal1()">Editar</button> <button class="btnDelete btn btn-danger" onclick="showModal()">Eliminar</button></td>
                        </tr>
                        `
                }
            }

            tabla.innerHTML = innerhtml;
        }
    };

    res.open("GET", "http://localhost:5000/Cows", true);
    res.send();
}

// ====================================================================

function jQueryAjax(ide){
    $(document).ready(function(){
        $.ajax({
            url: "http://localhost:5000/Cows",
            type: "GET",
            dataTypy: 'json',
            success: function(data, textStatus, xhr) {
                
                const tabla = document.querySelector("#bodyHtml");
                let innerhtml = "";

                for (var i = 0; i < data.length; i++) {
                    if (data[i].categoryId == ide) {
                        innerhtml += `
                        <tr>
                            <td class="rowT">${data[i].name}</td>
                            <td class="rowT"><img class="img1" src="${data[i].image}"></td>
                            <td class="rowT text-center"><button class="btnEdit btn btn-primary" onclick="showModal1()">Editar</button> <button class="btnDelete btn btn-danger" onclick="showModal()">Eliminar</button></td>
                        
                        `
                    }
                }

                tabla.innerHTML = innerhtml;
            },
            error: function(xhr, textStatus, errorThrown) {
                console.log('Error en Operacion');
            }
        })
    })
}