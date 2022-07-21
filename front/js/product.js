const image = document.createElement("img");

const image_parent = document.getElementsByClassName("item__img")
const title = document.getElementById("title")
const price = document.getElementById("price")
const description = document.getElementById("description")
const option_parent = document.getElementById("colors")
const button = document.getElementById("addToCart")



//On prend l'URL de la page et on récupère que la fin  (id du produit)

newURL = window.location.href
getID = newURL.split('=')
productID = getID[1]

// Puis on teste l'ID dans l'URL avec l'ID du produit sur lequel on a clické
for (let i = 0; i < 8;i++) {
    if (productID == sessionStorage[i]) {
        var currentID = i
    }
}




fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    value[currentID].colors.forEach(color => {
       const option =  document.createElement("option")
       option.value = color
       option.innerHTML = color
       option_parent.appendChild(option)
    });
    // On affiche les données correspondante à l'ID récupérée dans l'URL
    image.src = value[currentID].imageUrl;
    image.alt = value[currentID].altTxt;
    description.innerHTML = value[currentID].description;
    price.innerHTML = value[currentID].price;
    title.innerHTML = value[currentID].name;
  })
  .catch(function (err) {
    // Une erreur est survenue
});

image_parent[0].appendChild(image)

button.addEventListener("click", addCart)


// Fonction qui ajoute au session storage les produit que l'on séléctionne avec la qtt et la couleur
function addCart() {
  const slcColor = document.getElementById("colors").value
  const qtt = document.getElementById("quantity").value

  if (qtt <= 0) {
    return
  } else {
  var existingEntries = JSON.parse(sessionStorage.getItem("allEntries"));
  if(existingEntries == null) existingEntries = [];
  var entry = {
      "name" : '',
      "title" : productID,
      "color": slcColor,
      "qtt": qtt
  };
  sessionStorage.setItem("entry", JSON.stringify(entry));
  // Save allEntries back to local storage
  existingEntries.push(entry);
  sessionStorage.setItem("allEntries", JSON.stringify(existingEntries));
  }
  console.log(sessionStorage)
}