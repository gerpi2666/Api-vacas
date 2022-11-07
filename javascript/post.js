let cat
let name1;
let ima;

const showModal2 = () => {
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
            <button type="button" class="btn btn-warning" data-bs-dismiss="modal" onclick="insertCow()">Guardar</button>
          </div>
        </div>
      </div>
    </div>
      
          `;
    document.body.append(modal);

    let sho = new bootstrap.Modal(modal.querySelector('.modal'))

    sho.show();




}

const GetDataModal = (elemet, event, selector, handler) => {
    elemet.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e);
        }
    })
};


GetDataModal(document, 'click', '#add', e => {
    showModal2()
    console.log('HOLA')

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





function getCows(ide) {
    let a = "" + ide;
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
                        <td class="rowT text-center"><button class="btnEdit btn btn-primary">Editar</button> <button class="btnDelete btn btn-danger" onclick="showModal()">Eliminar</button></td>
                    
                    `
                }
            }


            tabla.innerHTML = innerhtml;
        })
}


function insertCow() {
    let vaca = {
        name: name1.value,
        image: ima.value,
        categoryId: cat
    }
    console.log(vaca)
    fetch("http://localhost:5000/Cows", {
            method: 'POST',
            body: JSON.stringify(vaca),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((res) => res.json())
        .then((res1) => console.log(res1))
}

