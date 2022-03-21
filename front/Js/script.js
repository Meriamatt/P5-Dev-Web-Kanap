// récupération de l'API
fetch('http://localhost:3000/api/products')
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (items) {
        addArticles(items);
    })
    .catch(function (err) {
        alert('Une erreur est survenue');
    });
    // fonction d'affichage des articles dans la page d'acceuil
addArticles = (items) => {
    // si l'élément items est défini (tableau) et le tableau items n'est pas vide 
    if (items != undefined && items.length > 0) {
        for (let i = 0; i < items.length; i++) {
            // le traitement sera exécuté sur chaque élément du tableau

            let articles = document.getElementById("items");
            let newArticle = document.createElement("article");
            let img = document.createElement("img");
            img.setAttribute("src", items[i].imageUrl);
            img.setAttribute("alt", items[i].altTxt);
            newArticle.appendChild(img);
            let h3 = document.createElement("h3");
            h3.classList.add("productName");
            h3.innerText = items[i].name;
            newArticle.appendChild(h3);
            let p = document.createElement("p");
            p.classList.add("productDescription");
            p.innerText = items[i].description;
            newArticle.appendChild(p);
            let a = document.createElement("a");
            a.setAttribute("href", "./product.html?id=" + items[i]._id);
            a.appendChild(newArticle);
            articles.appendChild(a);
            //créations des élements html 
        }
    } else {
        alert('tableau indéfini ou vide');
    }
}
