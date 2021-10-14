const catalogueDiv = document.querySelector('.catalogue')

const request = new XMLHttpRequest();
const url = "https://fakestoreapi.com/products?limit=4";
request.open('GET', url, true);
request.send();

request.onreadystatechange = (e) => {
    if (request.readyState === 4 && request.status === 200) {
        let clothes = JSON.parse(request.responseText);

        fillPage(clothes);
    }
}

function fillPage(clothes) {
    for (let i = 0; i < 3; i++) {
        let row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; i < 3; i++) {
            let card = document.createElement('div')
            card.classList.add('card')
            let title = document.createElement('h3').innerHTML = clothes[j].title
            card.append(title)

            let img = document.createElement('img').src = clothes[j].image
            card.append(img)

            let list = document.createElement('ul')
            list.classList.add('specs')

            let rate = document.createElement('li').innerHTML = `Valutazione: ${clothes[j].rating.rate}`
            list.append(rate)
            let category = document.createElement('li').innerHTML = `Categoria: ${clothes[j].category}`
            list.append(category)
            let price = document.createElement('li').innerHTML = `Prezzo: ${clothes[j].price}`
            list.append(price)
            row.append(card)
        }
        catalogueDiv.append(row)
    }
}