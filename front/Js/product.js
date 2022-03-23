let productUrl = window.location.href; // indiquer le lien courant (lien du produit choisi)
let url = new URL(productUrl);
let id = url.searchParams.get("id"); // récuperer l'ID du produit à partir du lien courant 
let itemToAdd = false;


let product = {};


fetch('http://localhost:3000/api/products/' + id) //récupérer que l'API du produit choisi
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (detail) {
        addDetail(detail);
        product = detail;
        console.log(detail);

    })
    .catch(function (err) {
        // Une erreur est survenue
    });

addDetail = (detail) => {
    console.log('in', detail);
    let color = detail.colors[0];
    console.log("color", color);
    let itemImage = document.getElementById("img-section");
    let img = document.createElement("img");
    img.setAttribute("src", detail.imageUrl);
    img.setAttribute("alt", detail.altTxt);
    itemImage.appendChild(img);
    let h1 = document.getElementById('title');
    h1.innerText = detail.name;
    let span = document.getElementById('price');
    span.innerText = detail.price;
    let p = document.getElementById('description');
    p.innerText = detail.description;
    let select = document.getElementById('colors');
    // pour ajouter les couleurs dans les options du select
    for (i = 0; i < detail.colors.length; i++) {
        var opt = document.createElement('option');
        opt.appendChild(document.createTextNode(detail.colors[i]));
        opt.value = detail.colors[i];
        select.appendChild(opt);
    }

}

document.getElementById('colors').addEventListener('change', function (event) { // On écoute l'événement click de la sélection de la couleur
    console.log(event.target.value); //(event.target.value est la couleur sélectionnée)
    product.selectedColor = event.target.value; // ajout de la couleur sélectionnée à l'objet produit 
    console.log(product);
});
document.getElementById('quantity').addEventListener('input', function (event) {
    console.log(event.target.value);
    product.quantity = parseInt(event.target.value); // ajout de la quantité selectionné à l'objet produit
    console.log(product);
});

document.getElementById('addToCart').addEventListener('click', function (event) {
    addProductToCart(product);
    console.log('click');
});
addProductToCart = (product) => {
    let products = JSON.parse(localStorage.getItem('listProduct')); //récupération des données du localstorage
    let chosenColor = document.getElementById("colors").value;
    if (products != undefined && products.length != 0) {
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id == product._id && chosenColor == products[i].selectedColor)
            // si le produit actuel existe déjà dans le tableau do local storage, et que la couleur choisie est la même 
             {
                products[i].quantity += product.quantity;
                itemToAdd = false;
                break;
            } else {
                itemToAdd = true;
            }
        }
        if (itemToAdd == true) {
            products.push(product);
            itemToAdd = false;
        }
    } else {
        products = [];
        products.push(product);
    }
    localStorage.setItem('listProduct', JSON.stringify(products));
}