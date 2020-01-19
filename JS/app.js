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

  if (title === "" || author === "" || pages === "" || isbn === "") {
    return;
  } else {
    let newBook = new Book(title, author, pages, isbn, img_link);
    myLibrary.push(newBook);
    //removeValue("form-control");
    updateLocalStorage(myLibrary);
    render();
    document.getElementById("form").reset();
  }
}

function render() {
  myLibrary.forEach((book, index) => displayBook(book, index));
}

function displayBook(book, index) {
  const booksContainer = document.getElementById("book-list");
  const divCard = document.createElement("div");
  divCard.className = "card col-12 col-md-3 col-lg-4";

  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top";
  cardImg.src = book.image;
  cardImg.style.width = "300";
  cardImg.style.height = "200";
  divCard.appendChild(cardImg);

  const divCardBody = document.createElement("div");
  divCardBody.className = "card-body";

  const hCardTitle = document.createElement("h5");
  hCardTitle.className = "card-title";
  divCardBody.appendChild(hCardTitle);

  const divCardTextTitle = document.createElement("div");
  divCardTextTitle.className = "card-text";
  divCardBody.appendChild(divCardTextTitle);

  const divCardTextAuthor = document.createElement("div");
  divCardTextAuthor.className = "card-text";
  divCardBody.appendChild(divCardTextAuthor);

  const divCardTextPages = document.createElement("div");
  divCardTextPages.className = "card-text";
  divCardBody.appendChild(divCardTextPages);

  divCard.appendChild(divCardBody);

  const divCardFooter = document.createElement("div");
  divCardFooter.className = "card-footer";

  const statusBtn = document.createElement("button");
  statusBtn.className = "btn btn-primary";
  statusBtn.innerHTML = "Read";
  divCardFooter.appendChild(statusBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger delete";
  deleteBtn.innerHTML = "Delete";
  deleteBtn.setAttribute("data-index", index);
  divCardFooter.appendChild(deleteBtn);

  divCard.appendChild(divCardFooter);
  booksContainer.appendChild(divCard);
}

document.getElementById("add").addEventListener("click", e => {
  addBookToLibrary();
  //document.getElementById("form").reset();
  //document.getElementById("modal-form").remove();
  //document.getElementById("modal-remover").classList.remove("modal-open");
  //document.getElementsByClassName("modal-backdrop").remove();
  /*const elements = document.getElementsByClassName("modal-backdrop");
  while (elements.length > 0) elements[0].remove();*/
  e.preventDefault();
});

function updateLocalStorage(array) {
  window.localStorage.setItem("library", JSON.stringify(array));
}

function removeValue(className) {
  let i = 0;
  const elements = document.getElementsByClassName(className);
  while (i < elements.length) {
    elements[i].value = "";
    i++;
  }
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
