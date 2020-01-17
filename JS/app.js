let myLibrary = [];

function Book(title, author, pages, isbn, image = "") {
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

  myLibrary.push(new Book(title, author, pages, isbn));
  render();
}

function render() {
  myLibrary.forEach((book, index) => displayBook(book, index));
}

function displayBook(book, index) {
  const listContainer = document.getElementById("book-list");
  const bookDetails = `<div><div>${book.title}</div>
  <div>${book.author}</div>
  <div>${book.pages}</div>
  <div>${book.isbn}</div>
  <div>
   <button onclick="toggleStatus(this)">Not Read</button>
   <button onclick="removeBook(this)" data-attributes = ${index} >Delete</button>
  </div>
  </div>`;

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
