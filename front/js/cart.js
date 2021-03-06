// On récupere les données envoyées précedement dans le session storage afin de les traiter
const parsed = JSON.parse(sessionStorage.allEntries)


const entryName = []
const entryPrice = []
const entryPhoto = []
var sumArtc = 0


fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (value) {
    for (let i = 0; i < value.length; i++) {
      parsed.forEach((parse) => {
        if (parse.title == value[i]._id) {
          entryName.push(value[i].name);
          entryPrice.push(value[i].price);
          entryPhoto.push(value[i].imageUrl)
        }
      });
    }
    Display()
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

function Display() {
  var articleTotal = [];
  console.log(parsed)
  for (var i = 0; i < parsed.length; i++) {

    const article = document.createElement("article");
    const item_img = document.createElement("div");
    const image = document.createElement("img");

    const item_content = document.createElement("div");
    const item_description = document.createElement("div");
    var item_settings = document.createElement("div");

    const item_title = document.createElement("h2");
    const item_color = document.createElement("p");
    const item_price = document.createElement("p");

    const settings = document.createElement("div");
    const settings_qtt = document.createElement("div");
    const qtt = document.createElement("p");
    var input_settings = document.createElement("input");

    const settings_delete = document.createElement("div");
    const del = document.createElement("p");

    const parent_article = document.getElementById("cart__items");

    //Définition du contenu des élements

    article.classList.add("cart__item");

    item_img.classList.add("cart__item__img");

    image.src = entryPhoto[i]

    item_content.classList.add("cart__item__content");
    item_description.classList.add("cart__item__content__description");


    item_title.innerHTML = entryName[i]
    item_color.innerHTML = parsed[i].color;
    item_price.innerHTML = entryPrice[i] + " €";

    settings.classList.add("cart__item__content__settings");
    settings_qtt.classList.add("cart__item__content__settings__quantity");

    qtt.innerHTML = "Quantité : ";



    input_settings.type = "number";
    input_settings.classList.add("itemQuantity");
    input_settings.name = "itemQuantity";
    input_settings.max = "100";
    input_settings.min = "1";
    input_settings.value = parsed[i].qtt

    settings_delete.classList.add("cart__item__content__settings__delete");
    del.classList.add("deleteItem");
    del.innerHTML = "Supprimer";

    var toDell = document.getElementsByClassName('deleteItem')


    //Ajout de l'élement à la page

    parent_article.appendChild(article);

    article.appendChild(item_img);
    item_img.appendChild(image);

    article.appendChild(item_content);
    item_content.appendChild(item_description);
    item_content.appendChild(settings);

    item_description.appendChild(item_title);
    item_description.appendChild(item_color);
    item_description.appendChild(item_price);

    settings.appendChild(settings_qtt);

    settings_qtt.appendChild(qtt);
    settings_qtt.appendChild(input_settings);

    settings.appendChild(settings_delete);
    settings_delete.appendChild(del);

    //Calucul total articles

    var val_input = document.getElementsByClassName("itemQuantity")
    var totalArtc = document.getElementById("totalQuantity")


    function CalcArt() {
      articleTotal = []
      sumArtc = 0


      for (let i = 0; i < parsed.length; i++) {
        articleTotal.push(val_input[i].value)
        parsed[i].qtt = articleTotal[i]
        sumArtc = parseInt(articleTotal[i]) + sumArtc

      }
      totalArtc.innerHTML = sumArtc
      CalcPrix()
    }

    input_settings.addEventListener('change', CalcArt)


  }


  //Calcul total prix
  function CalcPrix() {
    let sumPrice = 0;
    for (let i = 0; i < parsed.length; i++) {
      for (let a = 0; a < parsed[i].qtt; a++) {
        sumPrice += entryPrice[i]
      }

    }

    document.getElementById("totalPrice").innerHTML = sumPrice;
  }


  CalcArt()
  CalcPrix()



  //Bouton vider session storage

  const button_clear = document.getElementById("clear_panier");

  button_clear.addEventListener("click", rmvCart);

  function rmvCart() {
    sessionStorage.clear()
    console.log("le panier a été vidé")
    console.log(sessionStorage)
    location.reload()
  }

  // Vérifier les champs de texte quand click sur bouton commander

  const cmd_button = document.getElementById("order");

  function testNum(idTarget, errorTarget) {
    var number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var error = false;

    const str = document.getElementById(idTarget).value;
    const errorLocation = document.getElementById(errorTarget);

    var tab = str.split("");

    for (let i = 0; i < str.length; i++) {
      number.forEach((num) => {
        if (num == str[i]) {
          error = true;
        }
      });
    }

    if (error == true) {
      errorLocation.innerHTML = "Pas de chiffre(s) dans ce champ s'il vous plait";
      console.log("un champ contient un chiffre");
    } else {
      errorLocation.innerHTML = "";
    }
  }


  //Bouton supprimer



  for (let i = 0; i < toDell.length; i++) {
    toDell[i].addEventListener('click', Supprimer)
    const oldarticle = document.getElementsByClassName('cart__item')

    function Supprimer() {
/*       parsed.splice(i, 1)
      console.log(parsed) */
      const temparse = JSON.parse(sessionStorage.allEntries)
      console.log(temparse)
      temparse.splice(i,1)
      console.log(temparse)
      sessionStorage.removeItem('allEntries')
      sessionStorage.setItem("allEntries" , temparse)
      location.reload()



      /* Display() */
    }

  }

}