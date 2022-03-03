var productUrl = window.location.href;
var url = new URL(productUrl);
var id = url.searchParams.get("id");




fetch('http://localhost:3000/api/products/' + id)
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (detail) {
        addDetail(detail);

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