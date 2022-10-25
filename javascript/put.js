const showModal1 = () => {
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
                                <input type="text" class="form-control" id="raza1" name="name">
                            </div>
      
                            <div class="col-12">
                                <label for="link" class="form=control">Enlace de la imagen</label>
                                <input type="text" class="form-control" id="link1" name="image">
                            </div>
      
                            <div class="row btn-group" role="group">

                                <div class="col-4">
                                <div class="form-check form-check-inline rad">
                                <input class="form-check-input radio" type="radio" name="flexRadioDefault" id="milk" value="1" name="cate" >
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
            <button type="button" class="btn btn-warning" onclick="tvaCat()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
      
          `;
    document.body.append(modal);

    let sho = new bootstrap.Modal(modal.querySelector('.modal'))

    sho.show();




}

const selectRow1 = (elemet, event, selector, handler) => {
    elemet.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
};

let ia;
let raza;
let link;
let id

selectRow1(document, 'click', '.btnEdit', e => {

    const fila = e.target.parentNode.parentNode;
    ia = fila.firstElementChild.innerHTML
    showModal1()
    raza = document.querySelector('#raza1');
    let image = document.querySelector('.img1')
    link = document.querySelector('#link1');
    // console.log(raza)
    raza.value = fila.children[0].innerHTML;
    link.value = image.src;

    tvaCat()
})


function tvaCat() {
    let vaca1;
    fetch("http://localhost:5000/Cows")
        .then((res) => res.json())
        .then((res) => {

            for (var i = 0; i < res.length; i++) {
                if (res[i].name == ia) {
                    vaca1 = res[i];
                    id = vaca1.id;
                    break

                }
            }
            //  updateTable(vaca.categoryId)
            selection(vaca1.categoryId)
            updateCow(raza,link,vaca1);

        })
}

function selection(cat) {
    let milk = document.getElementById('milk');
    let meat = document.getElementById('meat');
    let double = document.getElementById('double');
    if (cat == 1) {
        milk.checked = true;
    }
    if (cat == 2) {
        meat.checked = true;
    }
    if (cat == 3) {
        double.checked = true;
    }

}

function updateCow(element1, element2, cow) {
    let vaca = {
        id: 0,
        name: '',
        image: '',
        categoryId: 0
    }


    vaca.id = cow.id;
    vaca.name = element1.value;
    vaca.image = element2.value;
    vaca.categoryId = cow.categoryId;

    fetch("http://localhost:5000/Cows/"+cow.id, {
            method: 'PUT',
            body: JSON.stringify(vaca),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((res) => res.json())
        .then((res1) => console.log(res1))

}