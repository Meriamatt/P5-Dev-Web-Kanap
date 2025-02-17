let cartProducts = JSON.parse(localStorage.getItem('listProduct')); // récupérations des produits ajoutés en panier 
let productOrder = { //création d'un objet qui contient un objet formulaire et un tableau de produits
    contact: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        email: ""
    },
    products: [],
}
let firstNameIsValid = false;
let lastNameIsValid = false;
let cityIsValid = false;
let addressIsValid = false;
let emailIsValid = false;
idCopy = () => {
    for (let i = 0; i < products.length; i++) {
        productOrder.products.push(
            cartProducts[i]._id,
        )
    };
    idCopy(); // copier tout les ID des produits et les coller dans le tableau products 

};
panier = () => {
    let cartItem = document.getElementById('cart__items');
    if (cartProducts != undefined && cartProducts.length != 0) {
        for (i = 0; i < cartProducts.length; i++) {
            let article = document.createElement("article");
            article.classList.add("cart__item");
            article.setAttribute("data-id", cartProducts[i]._id);
            article.setAttribute("data-color", cartProducts[i].selectedColor);
            let divImg = document.createElement("div");
            divImg.classList.add("cart__item__img");
            let img = document.createElement("img");
            img.setAttribute("src", cartProducts[i].imageUrl);
            img.setAttribute("alt", cartProducts[i].altTxt);
            let divcartItemContent = document.createElement("div");
            divcartItemContent.classList.add("cart__item__content");
            let divCartItemDescription = document.createElement("div");
            divCartItemDescription.classList.add("cart__item__content__description");
            let h2 = document.createElement("h2");
            h2.innerText = cartProducts[i].name;
            let p = document.createElement("p");
            p.innerText = "Couleur: " + cartProducts[i].selectedColor;
            let pPrice = document.createElement("p");
            pPrice.innerText = "prix: " + cartProducts[i].price + "€";
            let divCartItemSetting = document.createElement("div");
            divCartItemSetting.classList.add("cart__item__content__settings");
            let divCartItemQuantity = document.createElement("div");
            divCartItemQuantity.classList.add("cart__item__content__settings__quantity");
            let p1 = document.createElement("p");
            p1.innerText = "Quantité: ";
            let input = document.createElement("input");
            input.type = "number";
            input.setAttribute("min", 1);
            input.setAttribute("max", 100);
            input.className = "itemQuantity";
            input.name = "itemQuantity";
            input.value = cartProducts[i].quantity;
            let divDelet = document.createElement("div");
            divDelet.classList.add("cart__item__content__settings__delete");
            let pDelet = document.createElement("p");
            pDelet.innerText = "Supprimer";
            pDelet.classList.add("deleteItem");
            article.appendChild(divImg);
            article.appendChild(divcartItemContent);
            divImg.appendChild(img);
            divcartItemContent.appendChild(divCartItemDescription);
            divcartItemContent.appendChild(divCartItemSetting);
            divCartItemDescription.appendChild(h2);
            divCartItemDescription.appendChild(p);
            divCartItemDescription.appendChild(pPrice);
            divCartItemSetting.appendChild(divCartItemQuantity);
            divCartItemSetting.appendChild(divDelet);
            divCartItemQuantity.appendChild(p1);
            divCartItemQuantity.appendChild(input);
            divDelet.appendChild(pDelet);
            cartItem.appendChild(article);
        }
    }
} //création des élement Html

panier();
totalArticles = () => {

    if (cartProducts != undefined && cartProducts.length === 0) {
        return 0;
    }
    let total = 0;
    if (cartProducts != undefined && cartProducts.length != 0) {
        for (let i = 0; i < cartProducts.length; i++) {
            total += cartProducts[i].quantity;
        }
        console.log(total);
        document.getElementById("totalQuantity").innerText = total;
    }
};
totalArticles();
calculateSum = () => {

    if (cartProducts != undefined && cartProducts.length === 0) {
        return 0;
    }
    let sum = 0;
    if (cartProducts != undefined && cartProducts.length != 0) {
        for (let i = 0; i < cartProducts.length; i++) {
            sum += cartProducts[i].price * cartProducts[i].quantity;
        }
    }
    console.log(sum);
    document.getElementById("totalPrice").innerText = sum;
};
calculateSum();
for (i = 0; i < document.getElementsByClassName('itemQuantity').length; i++) {
    document.getElementsByClassName('itemQuantity')[i].addEventListener('change', function (event) { // On écoute l'événement click du changement de quantité  
        let currentId = event.target.closest("article").getAttribute("data-id"); // l'Id le plus proche de l'article courant
        let chosenColor = event.target.closest("article").getAttribute("data-color"); // le choix de couleur le plus proche de l'article
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i]._id == currentId && chosenColor == cartProducts[i].selectedColor) {
                cartProducts[i].quantity = parseInt(event.target.value);
            } // si l'Id de l'article courant existe déjà dans le tableau des produits et que la couleur choisi est la même ue celle dans le tableau
        }
        localStorage.setItem('listProduct', JSON.stringify(cartProducts));
        totalArticles();
        calculateSum();
    });
}

for (i = 0; i < document.getElementsByClassName('deleteItem').length; i++) {
    document.getElementsByClassName('deleteItem')[i].addEventListener('click', function (event) {

        let itemId = event.target.closest("article").getAttribute("data-id");
        for (let i = 0; i < cartProducts.length; i++) {
            if (cartProducts[i]._id == itemId) {
                cartProducts.splice(i, 1);
            }
            localStorage.setItem('listProduct', JSON.stringify(cartProducts));
            location.reload();
        }

    });

}
document.getElementById('firstName').addEventListener('change', function (event) { // On écoute l'événement change

    productOrder.contact.firstName = event.target.value;
    if (allLetter(event.target.value) == false){
        let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
        firstNameErrorMsg.innerText = "veuillez indiquer un prénom valide";
        firstNameIsValid = false;
    }
    else {
        firstNameErrorMsg.innerText = "";
        firstNameIsValid = true;
    }
}); // si firstName contient d'autres caractères que les lettres afficher le message d'erreur

allLetter = (entry) => {
    var letters = /^[a-zA-Z\s]*$/; //REGEX de lettres et d'espace seulement 
    if (entry.match(letters)) {
        return true;
    } else {

        return false;
    }
};

document.getElementById('lastName').addEventListener('change', function (event) { // On écoute l'événement change

    productOrder.contact.lastName = event.target.value;
    if (allLetter(event.target.value) == false) {
        let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
        lastNameErrorMsg.innerText = "veuillez indiquer un nom valide";
        lasttNameIsValid = false;
    }
    else {
        lastNameErrorMsg.innerText = "";
        lastNameIsValid = true;
    }
});

document.getElementById('address').addEventListener('change', function (event) { // On écoute l'événement change

    productOrder.contact.address = event.target.value;
    if (letterNumber(event.target.value) == false) {
        let addressErrorMsg = document.getElementById("addressErrorMsg");
        addressErrorMsg.innerText = "veuillez indiquer une adresse valide";
        addressIsValid = false;
    }
    else {
        addressErrorMsg.innerText = "";
        addressIsValid = true;
    }
});
letterNumber = (entry) => {
    var letterAndNumber = ("/[^a-zA-Z0-9 ]/", ""); //REGEX de lettres de nombres et d'espace seulement 
    if (entry.match(letterAndNumber)) {
        return true;
    } else {
        return false;
    }
};

document.getElementById('city').addEventListener('change', function (event) { // On écoute l'événement change

    productOrder.contact.city = event.target.value;
    if (allLetter(event.target.value) == false) {
        let cityErrorMsg = document.getElementById("cityErrorMsg");
        cityErrorMsg.innerText = "veuillez indiquer un nom de ville valide";
        cityIsValid = false;
    }
    else {
        cityErrorMsg.innerText = "";
        cityIsValid = true;
    }
});
document.getElementById('email').addEventListener('change', function (event) { // On écoute l'événement change

    productOrder.contact.email = event.target.value;
    if (validEmail(event.target.value) == false) {
        let emailErrorMsg = document.getElementById("emailErrorMsg");
        emailErrorMsg.innerText = "veuillez indiquer un email valide";
        emailIsValid = false;
    }
    else {
        emailErrorMsg.innerText = "";
        emailIsValid = true;
    }
});
validEmail = (entry) => {
    var emailCharacter = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (entry.match(emailCharacter)) {
        return true;
    } else {

        return false;
    }
};
send = () => {
    fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productOrder)
        })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function (value) {
            console.log(value);
            window.location = 'confirmation.html?orderId=' + value.orderId; //redirection vers la page confirmation en passant l'orderID dans l'URL de la page
        });
}
isValid = () => {
    if ((firstNameIsValid == true) && (lastNameIsValid == true) && (addressIsValid == true)
    && (cityIsValid == true) && (emailIsValid == true)) {
        return true;
    }
    else {
        return false;
    }
}
document.getElementById('order').addEventListener('click', function (event) { // On écoute l'événement click sur commander
    console.log(productOrder);
    if( (productOrder.contact.firstName != "") && (productOrder.contact.lastName != "") && (productOrder.contact.city != "") 
    && (productOrder.contact.address != "") && (productOrder.contact.email != "") 
    && (isValid() == true)) {
        send();
        }
    else {
        alert('veuillez remplir tout les champs du formulaire');
    }
    
    // envoie des données à l'API 
    localStorage.clear();
});