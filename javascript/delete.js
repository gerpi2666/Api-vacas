import {FillTable, GetDataModal} from './Util.js';

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

    let sho = new bootstrap.Modal(modal.querySelector('.modal'))

    sho.show();

    document.querySelector("#btnD").addEventListener("click", function(){
        DeleteCow();
    });
}


let nombre;
let btn;

GetDataModal(document, 'click', '.btnDelete', e => {
    const fila = e.target.parentNode.parentNode;
    nombre = fila.firstElementChild.innerHTML;
    btn = document.getElementById('btnD');
    showModal();
})



function DeleteCow() {
    let vaca;
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {

            for (var i = 0; i < res.length; i++) {
                if (res[i].name == nombre) {
                    vaca = res[i];
                    console.log(vaca);

                }
            }
            Delete(vaca);
            FillTable(vaca.categoryId);
        })
}


function Delete(vaca) {

    fetch("http://localhost:5000/Cows/" + vaca.id, {
        method: 'DELETE',
    });
    alert('Elemento borrado')

}