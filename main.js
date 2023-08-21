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

// function addBookToLibrary [

// ]

const test = new Book("hpotter", "jkrowling", 444, true);

console.log(test.getDetails());

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