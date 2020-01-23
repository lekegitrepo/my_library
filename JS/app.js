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
    updateLocalStorage(myLibrary);
    render();
    document.getElementById("form").reset();
  }
}

function render() {
  document.getElementById("book-list").innerHTML = "";
  myLibrary.forEach((book, index) => {
    const booksContainer = document.getElementById("book-list");
    const divCard = document.createElement("div");
    divCard.className = "card col-12 col-md-3 col-lg-4";

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = book.image;
    cardImg.style.width = "300px";
    cardImg.style.height = "150px";
    divCard.appendChild(cardImg);

    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";

    const hCardTitle = document.createElement("h5");
    hCardTitle.className = "card-title";
    hCardTitle.textContent = book.title;
    divCardBody.appendChild(hCardTitle);

    const divCardTextAuthor = document.createElement("div");
    divCardTextAuthor.className = "card-text";
    divCardTextAuthor.textContent = book.author;
    divCardBody.appendChild(divCardTextAuthor);

    const divCardTextPages = document.createElement("div");
    divCardTextPages.className = "card-text";
    divCardTextPages.textContent = book.pages;
    divCardBody.appendChild(divCardTextPages);

    const divCardTextIsbn = document.createElement("div");
    divCardTextIsbn.className = "card-text";
    divCardTextIsbn.textContent = book.isbn;
    divCardBody.appendChild(divCardTextIsbn);

    const statusBtn = document.createElement("button");
    statusBtn.className = "btn btn-primary";
    statusBtn.innerHTML = "Read";
    divCardBody.appendChild(statusBtn);

    divCard.appendChild(divCardBody);

    const divCardFooter = document.createElement("div");
    divCardFooter.className = "card-footer";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger delete";
    deleteBtn.innerHTML = "Delete";
    deleteBtn.setAttribute("data-index", index);
    deleteBtn.addEventListener("click", e => {
      deleteBook(e.target);
    });
    divCardFooter.appendChild(deleteBtn);

    divCard.appendChild(divCardFooter);
    booksContainer.appendChild(divCard);
  });
}

document.getElementById("add").addEventListener("click", e => {
  addBookToLibrary();
  console.log("add book button");
  e.preventDefault();
  console.log(`book in the library array ${myLibrary} ${myLibrary.length}`);
});

function updateLocalStorage(array) {
  window.localStorage.setItem("library", JSON.stringify(array));
}

function deleteBook(el) {
  const book = el.getAttribute("data-index");
  myLibrary.splice(book, 1);
  el.parentElement.parentElement.remove();
  updateLocalStorage(myLibrary);
  render();
  e.preventDefault();
}
