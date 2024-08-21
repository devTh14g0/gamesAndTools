const Product = require("./Product")

module.exports = class Book extends Product {
constructor(title,synopsis,genre,page,author,description,price,inStock=0){
  super(`livro : ${title}`,description,price,inStock)
  this.synopsis=synopsis
  this.genre=genre
  this.page=page
  this.author = author
}
}