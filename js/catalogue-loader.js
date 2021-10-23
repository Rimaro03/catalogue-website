const catalogueDiv = document.querySelector('.catalogue')

//All'apertura della pagina
document.onreadystatechange = (e) => {
    if (document.readyState == 'complete') {
        const request = new XMLHttpRequest();
        const url = "https://fakestoreapi.com/products";
        request.open('GET', url, true);
        request.send();

        request.onreadystatechange = (e) => {
            if (request.readyState === 4 && request.status === 200) {
                let clothesRES = JSON.parse(request.responseText);

                let clothes = [];
                for (let i = 0; i < 9; i++) {
                    let index = Math.floor(Math.random() * clothesRES.length);
                    clothes.push(clothesRES[index]);
                    clothesRES.splice(index, 1);
                }

                fillPage(clothes);
            }
        }
    }
}

//In abse ai filtri
function checkBox() {
    const typeChecks = document.querySelectorAll(".type")

    catalogueDiv.innerHTML = ''

    let checks = [];
    typeChecks.forEach(checkBox => {
        if (checkBox.checked) {
            checks.push(checkBox.name.replace('-', ' '))
        }
    });

    if (checks.length == 0) {
        console.log('nessun filtro');
        return;
    }

    checks.forEach(category => {
        const request = new XMLHttpRequest();
        const url = `https://fakestoreapi.com/products/category/${category}`;
        request.open('GET', url, true);
        request.send();

        request.onreadystatechange = (e) => {
            if (request.readyState === 4 && request.status === 200) {
                let clothes = JSON.parse(request.responseText);

                fillPage(clothes);
            }
        }
    })
}


//Carica i prodotti
function fillPage(clothes) {
    clothes.forEach(cloth => {
        for (let i = 0; i < 3; i++) {
            let row = document.createElement('div')
            row.classList.add('row')
            for (let j = 0; j < 3; j++) {
                let card = document.createElement('div')
                card.classList.add('card')
                let title = document.createElement('h4')
                console.log(cloth);
                title.innerHTML = cloth.title
                card.append(title)

                let img = document.createElement('img');
                img.src = cloth.image;

                card.append(img)

                let list = document.createElement('ul')
                list.classList.add('specs')

                let rate = document.createElement('li')
                rate.innerHTML = `Valutazione: ${cloth.rating.rate}`
                list.append(rate)

                let category = document.createElement('li')
                category.innerHTML = `Categoria: ${cloth.category}`
                list.append(category)

                let price = document.createElement('li')
                price.innerHTML = `Prezzo: ${cloth.price}`
                list.append(price)

                card.append(list)

                row.append(card)
            }
            catalogueDiv.append(row)
        }
    });
}