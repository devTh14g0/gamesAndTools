module.exports = class Product {
  constructor(name,description,price,inStock=0){
    this.name=name
    this.descrption=description
    this.price=price
    this.inStock=inStock
  }

  addToStock(quantity){
    this.inStock = this.inStock + quantity
  }
  removeStock(quantity){
    this.inStock = this.inStock - quantity
  }
}