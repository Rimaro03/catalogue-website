const sliderDiv = document.querySelector('.slider');

const request = new XMLHttpRequest();
const url = "https://fakestoreapi.com/products?limit=4";
request.open('GET', url, true);
request.send();


request.onreadystatechange = (e) => {
    if (request.readyState === 4 && request.status === 200) {
        let clothes = JSON.parse(request.responseText);

        for(let i=0; i<4; i++){
            let image = document.createElement('img');
            image.src = clothes[i].image;
            image.classList.add('firstImg');
            image.classList.add('img');
            sliderDiv.appendChild(image);
        }
    }
}


