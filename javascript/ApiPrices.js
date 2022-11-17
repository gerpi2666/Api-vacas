let FR = document.querySelector('#fr')
let PT = document.querySelector('#pt')
let AL = document.querySelector('#de')

FR.addEventListener('click', () => {
    GetCards('FR', 636.54, 'Francia')
})
PT.addEventListener('click', () => {
    GetCards('PT', 636.54, 'Portugal')
})

AL.addEventListener('click', () => {
    GetCards('DE', 636.54, 'Alemania')
})

const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC'
});

async function GetCards(code, exchangeRate, country) {
    
    let cartas = document.querySelector('#cartas');
    let titulo = document.querySelector('#paisTitulo');
    let loader = `<svg><circle cx="25" cy="25" r="25"></circle></svg>`;
    cartas.innerHTML = loader;
    titulo.innerHTML = "";

    let categorias = [{
        nombre: 'Novillas',
        nombreBusqueda: 'Heifers'
    }, {
        nombre: 'Novillos',
        nombreBusqueda: 'Steers'
    }, {
        nombre: 'Toretes',
        nombreBusqueda: 'Young bulls'
    }];

    let htmlCards = "";
    for (let i = 0; i <categorias.length; i++) {
        let precioPromedio = await getPrices(code, exchangeRate, categorias[i].nombreBusqueda)
        let kilo=precioPromedio / 100;

                htmlCards += `<div class="card p-0 col m-2" style="width: 18rem;">
                        <img src="${imgSrc(categorias[i].nombreBusqueda)}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-center">Precio por ${categorias[i].nombre}</h5>
                            
                            <p class="text-center">Precio promedio canal<span class="mt-2"><br>${formatter.format(precioPromedio)}</span></p>
                            <p class="text-center">Precio promedio canal por kilo<span class="mt-2"><br>${formatter.format(kilo)}</span></p>

                            </div>
                        </div>`
    }

    titulo.innerHTML = country;
    cartas.innerHTML = htmlCards;

}

async function getPrices(code, exchangeRate, category) {
    let a;
    const response = await fetch('https://ec.europa.eu/agrifood/api/beef/prices?memberStateCodes=' + code + '&years=2019,2020&months=1,3,9&weeks=5,6,7,8,40,41,42&beginDate=01/09/2019&endDate=02/02/2020&carcassCategories')

    const data = await response.json();

    let count = 0;
    let avg = 0;
    data.forEach(element => {
        if (element.category == category) {
            let str = element.price;
            str = str.substring(1);
            avg += parseFloat(str);
            count++;
        }
    });

    avg = (avg / count) * exchangeRate;
    return avg;
}

function imgSrc(categoryName){
    let src='';
    if (categoryName=='Heifers') {
        src+='https://storage.contextoganadero.com/s3fs-public/styles/noticias_one/public/ganaderia/field_image/2019-05/raza_simmental.jpg?itok=qWVKIjog'
    }
    if (categoryName=='Steers') {
        src+='https://thumbs.dreamstime.com/b/breeding-brahman-cattle-breed-breeding-brahman-cattle-breed-186546763.jpg'
    }
    if (categoryName=='Young bulls') {
        src+='https://i.pinimg.com/550x/f2/a0/b2/f2a0b22660c8e4ce5fa52eaa6dc904d5.jpg'
    }
    return src;
}