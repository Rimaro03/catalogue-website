const catalogueDiv = document.querySelector('.catalogue')

const request = new XMLHttpRequest();
const url = "https://fakestoreapi.com/products?limit=9";
request.open('GET', url, true);
request.send();

request.onreadystatechange = (e) => {
    if (request.readyState === 4 && request.status === 200) {
        let clothes = JSON.parse(request.responseText);

        fillPage(clothes);
    }
}

const typeChecks = document.querySelectorAll(".type")

function checkBox() {
    let checks = [];
    typeChecks.forEach(checkBox => {
        console.log(checkBox);
        if (checkBox.checked) {
            checks.push(checkBox.name.replace('-', ' '))
        }
    });

    const request = new XMLHttpRequest();
    const url = "https://fakestoreapi.com/products?limit=9";
    request.open('GET', url, true);
    request.send();

    request.onreadystatechange = (e) => {
        if (request.readyState === 4 && request.status === 200) {
            let clothes = JSON.parse(request.responseText);

            fillPage(clothes);
        }
    }

}

function fillPage(clothes) {
    let counter = 0;
    for (let i = 0; i < 3; i++) {
        let row = document.createElement('div')
        row.classList.add('row')
        for (let j = 0; j < 3; j++) {
            let card = document.createElement('div')
            card.classList.add('card')
            let title = document.createElement('h4')
            title.innerHTML = clothes[counter].title
            card.append(title)

            let img = document.createElement('img');
            img.src = clothes[counter].image;

            card.append(img)

            let list = document.createElement('ul')
            list.classList.add('specs')

            let rate = document.createElement('li')
            rate.innerHTML = `Valutazione: ${clothes[counter].rating.rate}`
            list.append(rate)

            let category = document.createElement('li')
            category.innerHTML = `Categoria: ${clothes[counter].category}`
            list.append(category)

            let price = document.createElement('li')
            price.innerHTML = `Prezzo: ${clothes[counter].price}`
            list.append(price)

            card.append(list)

            row.append(card)

            counter++;
        }
        catalogueDiv.append(row)
    }
}