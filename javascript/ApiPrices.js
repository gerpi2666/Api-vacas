let FR = document.querySelector('#fr')
let PT = document.querySelector('#pt')
let AL = document.querySelector('#de')

const formatter = new Intl.NumberFormat('es-CR', {
    style: 'currency',
    currency: 'CRC'
});


function GetCountryBeff(code, exchangeRate) {
    fetch('https://ec.europa.eu/agrifood/api/beef/prices?memberStateCodes=' + code + '&years=2019,2020&months=1,3,9&weeks=5,6,7,8,40,41,42&beginDate=01/09/2019&endDate=02/02/2020&carcassCategories=heifers,cows')
        .then((res) => res.json())
        .then((res) => {
            let count = 0;
            let avg = 0;
            res.forEach(element => {
                if (element.category == 'Heifers') {
                    let str = element.price;
                    str = str.substring(1);
                    avg += parseFloat(str);
                    count++;
                }
            });

            avg = (avg / count) * exchangeRate;
            avg = formatter.format(avg)

            console.log(avg)

        })
}

GetCountryBeff('PT', 636.54)