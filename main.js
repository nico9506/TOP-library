const libraryArray = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.getDetails = function () {
    return (
        "Title: " +
        this.title +
        "\n" +
        "Author: " +
        this.author +
        "\n" +
        "Number of pages: " +
        this.pages +
        "\n" +
        "Has this book been read?: " +
        this.isRead
    );
};

/* Testing */
const test = new Book("hpotter", "jkrowling", 444, true);
const test2 = new Book("New World Order", "Ray Dalio", 654, false);
libraryArray.push(test);
libraryArray.push(test2);

libraryArray.forEach(book => {
    const booksContainer = document.getElementById("books-container");

    const bookContainer = document.createElement("div");
    bookContainer.classList.add("book");

    const bookTitle = document.createElement("div");
    bookTitle.classList.add("book-title");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("div");
    bookAuthor.classList.add("book-author");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("div");
    bookPages.classList.add("book-pages");
    bookPages.textContent = book.pages;

    const bookRead = document.createElement("div");
    bookRead.classList.add("book-read");
    bookRead.textContent = book.isRead;

    booksContainer.appendChild(bookContainer);
    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookPages);
    bookContainer.appendChild(bookRead);
});


console.log(test.getDetails());

/* ----------------------------------------------------------------- */
/* ------------------- Webpage Functionalities --------------------- */
/* ----------------------------------------------------------------- */
const libraryContainer = document.getElementById('books-container');
const popup = document.getElementById("popup");

const addNewBook = document.getElementById('btn-add-book');
addNewBook.addEventListener("click", toggleShowClass);

let inputTitle = document.getElementById("input-title");
let inputAuthor = document.getElementById("input-author");
let inputPages = document.getElementById("input-pages");
let inputRead = document.getElementById("input-read");

const btnPopupCancel = document.getElementById("btn-popup-cancel");
btnPopupCancel.addEventListener("click", cleanFieldsAndToggle);

function toggleShowClass() {
    popup.classList.toggle("show");
}

function cleanPopupFields() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;
}

function cleanFieldsAndToggle() {
    cleanPopupFields();
    toggleShowClass();
}

function addBookToLibraryArray() {
    const newTitle = document.getElementById("input-title").value;
    const newAuthor = document.getElementById("input-author").value;
    const newPages = document.getElementById("input-pages").value;
    const newRead = document.getElementById("input-read").checked;

    const newBook = new Book(newTitle, newAuthor, newPages, newRead);

    libraryArray.push(newBook);
}
    