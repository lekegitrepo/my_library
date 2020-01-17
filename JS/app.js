let myLibrary = [];

function Book(title, author, pages, isbn, image) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isbn = isbn;
  this.image = image;
}

function addBookToLibrary() {
  // do stuff here
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const isbn = document.getElementById("isbn").value;

  let img_link = document.getElementById("image").value;
  img_link = img_link == "" ? "./images/book-image.png" : img_link;

  myLibrary.push(new Book(title, author, pages, isbn, img_link));
  render();
}

function render() {
  myLibrary.forEach((book, index) => displayBook(book, index));
}

function displayBook(book, index) {
  const listContainer = document.getElementById("book-list");
  const bookDetails = `<div class="card col-md-4">
  <img class="card-img-top" src="${book.image}" width="50px" height="80px" alt="Card image cap">
  <div class="card-body">
  <h5 class="card-title">${book.title}</h5>
  <div class="card-text">${book.author}</div>
  <div class="card-text">${book.pages}</div>
  <div class="card-text">${book.isbn}</div>
  <div>
  <div>
   <button onclick="toggleStatus(this)">Not Read</button>
   <button onclick="removeBook(this)" data-attributes = ${index} >Delete</button>
  </div>
  </div>`;
  /*let row = document.createElement("div");
  row.className = "row";
  listContainer.appendChild(row);*/

  listContainer.innerHTML += bookDetails;
}

document.getElementById("form").addEventListener("submit", e => {
  addBookToLibrary();
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", render());

/*function removeBook(book) {
  let bookToDelete = book.getAttribute("data-attributes");
  myLibrary.splice(bookToDelete, 1);
  render();
}*/
