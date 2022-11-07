import {FillTable, GetDataModal} from './Util.js';

let cat
let name1;
let ima;
let modal = null;

const showModal = () => {
    if (modal !== null) {
        modal.remove();
    }

    modal = document.createElement('div');

    modal.innerHTML += `
      
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                 <h4 class="text-warning">Actulizar datos</h4>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                     <div class="col-12">
                            <form class="row g-3" id="form">
      
                            <div class="col-12">
                                <label for="name" class="form-label">Raza de la vaca</label>
                                <input type="text" class="form-control" id="raza2" name="name">
                            </div>
      
                            <div class="col-12">
                                <label for="link" class="form=control">Enlace de la imagen</label>
                                <input type="text" class="form-control" id="link2" name="image">
                            </div>
      
                            <div class="row btn-group" role="group">

                                <div class="col-4">
                                <div class="form-check form-check-inline rad">
                                <input class="form-check-input radio" type="radio" name="flexRadioDefault" id="milk" value="1" name="cate">
                                <label class="form-check-label" for="flexRadioDefault1">
                                  Produccion lechera
                                </label>
                                 </div>
                                </div>
                    
                                <div class="col-4">
                                <div class="form-check form-check-inline rad">
                              <input class="form-check-input radio" type="radio" name="flexRadioDefault" id="meat" value="2" name="cate" >
                              <label class="form-check-label" for="flexRadioDefault2">
                                Produccion carnica
                              </label>
                            </div>
                           </div>
                    
                           <div class="col-4">
                            <div class="form-check form-check-inline rad">
                              <input class="form-check-input radio" type="radio" name="flexRadioDefault" id="double" value="3" name="cate">
                              <label class="form-check-label" for="flexRadioDefault2">
                                Produccion doble proposito
                              </label>
                            </div>
                           </div>
                    
                    
                            </div>
                            
      
      
                            </form>
                        </div>
                </div>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button id="btnInsert" type="button" class="btn btn-warning" data-bs-dismiss="modal">Guardar</button>
          </div>
        </div>
      </div>
    </div>
      
          `;
    document.body.append(modal);

    let sho = new bootstrap.Modal(modal.querySelector('.modal'))

    sho.show();

    document.querySelector("#btnInsert").addEventListener('click', function(){
        PostCow();
    });

}


GetDataModal(document, 'click', '#add', e => {
    
    showModal()

    name1 = document.querySelector('#raza2');
    ima = document.querySelector('#link2');
    let milk = document.getElementById('milk');
    let meat = document.getElementById('meat');
    let double = document.getElementById('double');
    milk.addEventListener('click', () => {
        cat = 1
    })
    meat.addEventListener('click', () => {
        cat = 2
    })
    double.addEventListener('click', () => {
        cat = 3
    })

})


function PostCow(){
    let vaca = {
        name: name1.value,
        image: ima.value,
        categoryId: cat
    }
    Post(vaca);
    FillTable(vaca.categoryId);
}


function Post(vaca) {
 
    fetch("http://localhost:5000/Cows", {
            method: 'POST',
            body: JSON.stringify(vaca),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((res) => res.json())
        .then((res1) => console.log(res1))
        alert('Elemento agregado')

}
