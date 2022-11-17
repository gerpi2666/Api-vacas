let FR = document.querySelector('#fr')
let PT = document.querySelector('#pt')
let AL = document.querySelector('#de')

FR.addEventListener('click', () => {
    GetCards('FR', 636.54)
})
PT.addEventListener('click', () => {
    GetCards('PT', 636.54)
})

AL.addEventListener('click', () => {
    GetCards('DE', 636.54)
})

const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC'
});

async function GetCards(code, exchangeRate) {
    
    let cartas = document.querySelector('#cartas');

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
    for (let i = 0; i < categorias.length; i++) {
        let kilo;
        let precioPromedio = await getPrices(code, exchangeRate, categorias[i].nombreBusqueda)
        kilo=precioPromedio;
                htmlCards += `<div class="card p-0 col m-2" style="width: 18rem;">
                        <img src="https://www.cattle.com/blog/images/Bull.jpg" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title text-center">Precio por ${categorias[i].nombre}</h5>
                            
                            <p class="text-center">Precio promedio canal<span class="mt-2"><br>${precioPromedio}</span></p>
                            <p class="text-center">Precio promedio canal por kilo<span class"mt-2"><br>${priceXkilo(kilo)}</p>

                            </div>
                        </div>`
    }

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
    avg = formatter.format(avg);
    return avg;
}

function priceXkilo(price){
    return price/100
}