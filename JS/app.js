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

    const div = document.createElement("div");
    div.className = "col-lg-4 col-md-6 mb-4";
    const divCard = document.createElement("div");
    divCard.className = "card h-100";

    div.appendChild(divCard);

    const cardImg = document.createElement("img");
    cardImg.className = "card-img-top";
    cardImg.src = book.image;
    cardImg.style.height = "155px";
    divCard.appendChild(cardImg);

    const divCardBody = document.createElement("div");
    divCardBody.className = "card-body";

    const hCardTitle = document.createElement("h5");
    hCardTitle.className = "card-title";
    hCardTitle.innerHTML = `<b>Title</b>: ${book.title}`;
    divCardBody.appendChild(hCardTitle);

    const divCardTextAuthor = document.createElement("div");
    divCardTextAuthor.className = "card-text";
    divCardTextAuthor.innerHTML = `<b>Author</b>: ${book.author}`;
    divCardBody.appendChild(divCardTextAuthor);

    const divCardTextPages = document.createElement("div");
    divCardTextPages.className = "card-text";
    divCardTextPages.innerHTML = `<b>Pages</b>: ${book.pages}`;
    divCardBody.appendChild(divCardTextPages);

    const divCardTextIsbn = document.createElement("div");
    divCardTextIsbn.className = "card-text";
    divCardTextIsbn.innerHTML = `<b>ISBN</b>: ${book.isbn}`;
    divCardBody.appendChild(divCardTextIsbn);

    const statusBtn = document.createElement("button");
    statusBtn.className = "btn btn-info btn-block";
    statusBtn.textContent = "Unread";
    statusBtn.setAttribute("data-index", index);
    statusBtn.addEventListener("click", e => {
      readStatus(e.target);
    });
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
    booksContainer.appendChild(div);
  });
}

document.getElementById("add").addEventListener("click", e => {
  addBookToLibrary();
  e.preventDefault();
});

function updateLocalStorage(array) {
  window.localStorage.setItem("library", JSON.stringify(array));
}

function readStatus(elem) {
  const status = elem.textContent;
  elem.textContent = status == "Unread" ? "Read" : "Unread";
}

function deleteBook(el) {
  const book = el.getAttribute("data-index");
  myLibrary.splice(book, 1);
  el.parentElement.parentElement.remove();
  updateLocalStorage(myLibrary);
  render();
  e.preventDefault();
}
