let modal = null;

const showModal = () => {
    if (modal !== null) {
        modal.remove();
    }

    modal = document.createElement('div');

    modal.innerHTML += `
        <div class="modal" tabindex="-1">
            <div class="modal-dialog">
             <div class="modal-content">
            <div class="modal-header">
             <h5 class="modal-title">Eliminar un elemento</h5>
           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
           <p>Esta seguro que desea borrar este elemento?</p>
            </div>
            <div class="modal-footer">
           <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
           <button type="button" id="btnD" class="btn btn-primary" data-bs-dismiss="modal">Guardar Cambios</button>
             </div>
            </div>
            </div>
         </div>
      
          `;
    document.body.append(modal);

    let sho=new bootstrap.Modal(modal.querySelector('.modal'))

    sho.show();




}

const selectRow=(elemet, event, selector, handler)=>{
    elemet.addEventListener(event,e =>{
        if(e.target.closest(selector)){
            handler(e);
        }
    })
};


let ide;

selectRow(document, 'click', '.btnDelete', e=>{
    

    const fila= e.target.parentNode.parentNode;
    console.log(fila);
     ide= fila.firstElementChild.innerHTML
    console.log(ide)
    tvaca(ide)
})

//delete

function updateTable(ide){
    
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {

            const tabla = document.querySelector("#bodyHtml");
            let innerhtml = "";

          
            for (var i = 0; i < res.length; i++) {
                if (res[i].categoryId == ide) {
                    innerhtml+= `
                    <tr>
                        <td class="rowT">${res[i].name}</td>
                        <td class="rowT"><img class="img1" src="${res[i].image}"></td>
                        <td class="rowT text-center"><button class="btnEdit btn btn-primary" onclick="showModal1()">Editar</button> <button class="btnDelete btn btn-danger" onclick="showModal()">Eliminar</button></td>
                    
                    `
                }
            }


            tabla.innerHTML = innerhtml;
        })
}


function tvaca() {
    let vaca;
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {

            for (var i = 0; i < res.length; i++) {
                if (res[i].name == ide) {
                   vaca= res[i];
                   console.log(vaca);

                }
            }
            deleteCow(vaca);
            updateTable(vaca.categoryId)

        })
}


function deleteCow(vaca) {
    
    fetch("http://localhost:5000/Cows/" + vaca.id, {
        method: 'DELETE',
    });
    alert('Elemento borrado')

}