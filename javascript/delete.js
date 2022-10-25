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
           <button type="button" id="btnD" class="btn btn-primary">Guardar Cambios</button>
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




let id='';
selectRow(document, 'click', '.btnDelete', e=>{
    const fila= e.target.parentNode.parentNode;
    console.log(fila);
     id= fila.firstElementChild.innerHTML
    console.log(id)
})

//delete

function deleteCow(id) {


    
    fetch("http://localhost:5000/Cows/" + id, {
        method: 'DELETE',
    });
    console.alert('Elemento borrado')

}