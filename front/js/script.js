for (let i = 0; i < 8;i++){
const link = document.createElement("a");
const article = document.createElement("article");
const image = document.createElement("img");
const box = document.getElementById("items");
const title = document.createElement("h3");
const text = document.createElement("p");

    fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    console.log(value);
    title.innerHTML = value[i].name;
    image.src = value[i].imageUrl;
    image.alt = value[i].altTxt;
    text.innerHTML = value[i].description;
    link.href = "./product.html?id=" + value[i]._id;
    article.onclick(window.open("./product.html?id=" + value[i]._id))
  })
  .catch(function (err) {
    // Une erreur est survenue
});

box.appendChild(link);
box.appendChild(article);

article.appendChild(image);
article.appendChild(title);
article.appendChild(text);

}