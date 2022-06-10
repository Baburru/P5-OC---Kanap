for (let i = 0; i < 8; i++) {
  const link = document.createElement("a");
  const article = document.createElement("article");
  const image = document.createElement("img");
  const title = document.createElement("h3");
  const text = document.createElement("p");

  const box = document.getElementById("items");

  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      title.innerHTML = value[i].name;
      image.src = value[i].imageUrl;
      image.alt = value[i].altTxt;
      text.innerHTML = value[i].description
      //On met l'id dans le session storage pour le récupérer et tester sur la page produit
      sessionStorage.setItem(i,value[i]._id)
      //Ajout evenement click sur les articles pour ouvrir la page produit correspondante
      article.addEventListener("click", openTab)
      function openTab(){window.open("./product.html?id=" + value[i]._id, "_self")}
    })
    .catch(function (err) {
      // Une erreur est survenue
    });

    title.classList.add("productName")
    text.classList.add("productDescription")



  box.appendChild(article);

  article.appendChild(image);
  article.appendChild(title);
  article.appendChild(text);
}
