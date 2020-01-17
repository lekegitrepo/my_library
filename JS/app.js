let myLibrary = JSON.parse(window.localStorage.getItem("library"));
if (myLibrary == null) {
  myLibrary = [];
}

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
   <button class='btn btn-primary btn-sm'>Not Read</button>
   <button data-index= ${index} class='btn btn-danger btn-sm delete' >Delete</button>
  </div>
  </div>`;
  /*let row = document.createElement("div");
  row.className = "row";
  listContainer.appendChild(row);*/

  listContainer.innerHTML += bookDetails;
}

document.getElementById("add").addEventListener("click", e => {
  addBookToLibrary();
  e.preventDefault();
});

document.addEventListener("DOMContentLoaded", render());

function removeBook(book) {
  let bookToDelete = book.getAttribute("data-index");
  bookToDelete.style.display = "none";
  myLibrary.splice(bookToDelete, 1);
  updateLocalStorage(myLibrary);
  render();
}

function updateLocalStorage(array) {
  window.localStorage.setItem("library", JSON.stringify(array));
}

function deleteBook(el) {
  if (el.classList.contains("delete")) {
    el.parentElement.parentElement.parentElement.parentElement.remove();
    const book = el.getAttribute("data-index");
    myLibrary.splice(book, 1);
    updateLocalStorage(myLibrary);
    render();
  }
}

document.querySelector("#book-list").addEventListener("click", e => {
  deleteBook(e.target);
});
