console.log(sessionStorage)


//Création des élements

var panier = []

const article = document.createElement("article")
const item_img = document.createElement("div")
const image = document.createElement("img")

const item_content = document.createElement("div")
const item_description = document.createElement("div")
const item_settings = document.createElement("div")


const item_title = document.createElement("h2")
const item_color = document.createElement("p")
const item_price = document.createElement("p")

const settings = document.createElement("div")
const settings_qtt = document.createElement("div")
const qtt = document.createElement("p")
const input_settings = document.createElement("input")

const settings_delete = document.createElement("div")
const del = document.createElement("p")




const parent_article = document.getElementById("cart__items")
const button_clear = document.getElementById("clear_panier")

//Définition du contenu des élements



article.classList.add("cart__item")


item_img.classList.add("cart__item__img")
image.src = "../images/logo.png"

item_content.classList.add("cart__item__content")
item_description.classList.add("cart__item__content__description")

item_title.innerHTML = "Nom du produit"
item_color.innerHTML = "Couleur"
item_price.innerHTML = "667 €"

settings.classList.add("cart__item__content__settings")
settings_qtt.classList.add("cart__item__content__settings__quantity")

qtt.innerHTML = "Qté : X"

input_settings.type = "number"
input_settings.classList.add("itemQuantity")
input_settings.name = "itemQuantity"
input_settings.max = "100"
input_settings.min = "1"
input_settings.value = "42"

settings_delete.classList.add("cart__item__content__settings__delete")
del.classList.add("deleteItem")
del.innerHTML = "Supprimer"


//Ajout de l'élement à la page

parent_article.appendChild(article)

article.appendChild(item_img)
item_img.appendChild(image)

article.appendChild(item_content)
item_content.appendChild(item_description)
item_content.appendChild(settings)

item_description.appendChild(item_title)
item_description.appendChild(item_color)
item_description.appendChild(item_price)

settings.appendChild(settings_qtt)

settings_qtt.appendChild(qtt)
settings_qtt.appendChild(input_settings)

settings.appendChild(settings_delete)
settings_delete.appendChild(del)








//Bouton vider session storage


button_clear.addEventListener("click", rmvCart)

function rmvCart() {
sessionStorage.clear()
  console.log("le panier a été vidé")
  console.log(sessionStorage)
}