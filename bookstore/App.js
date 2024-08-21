const database = require("./database");
const user = require("./User");
const book = require("./Book");
const author = require("./Author");
const order = require("./Order");
const poster = require("./Poster");
const Book = require("./Book");

module.exports = class App {
  static #database = new database();

  createUser(name, email, password) {
    const User = new User(name, email, password);
    App.#database.saveUser(user);
  }

  getUsers() {
    return App.#database.find("users");
  }

  createAuthor(name, nacionality, bio) {
    const Author = new Author(name, nacionality, bio);
    App.#database.saveAuthor(author);
  }
  getAuthors() {
    return App.#database.find("authors");
  }
  createBook(
    title,
    synopsis,
    genre,
    pages,
    author,
    description,
    price,
    inStock
  ) {
    const Book = new Book(
      title,
      synopsis,
      genre,
      pages,
      author,
      description,
      price,
      inStock
    );
    App.#database.saveBook(book);
  }
  addBook(bookName, quantity) {
    App.#database.addBooksToStock(bookName, quantity);
  }
  getBooks() {
    return App.#database.find("books");
  }
  createPoster(name, description, height, width, price, inStock) {
    const Poster = new Poster(name, description, height, width, price, inStock);
    App.#database.createPoster(poster);
  }
  addPoster(posterName, quantity) {
    App.#database.addPostersToStock(posterName, quantity);
  }
  getPosters() {
    return App.#database.find("posters")
  }

  createOrderItems (items,user){
    const Order = new Order(items,user)
    App.#database.saveOrder(order)
    order.data.items.forEach(({product,quantity})=>{
      if (product instanceof Book){
        App.#database.removeBookFromStock(product.name,quantity)
      }
    })
  }
  getOrders(){
    return App.#database.find('orders')
  }
  showDatabase(){
    App.#database.showStorage()
  }
};
