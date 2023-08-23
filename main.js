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

console.log(test.getDetails());

/* First call of function to initialize the library display */
refreshLibrary();
/* -------------------------------------------------------- */

/* ----------------------------------------------------------------- */
/* ------------------- Webpage Functionalities --------------------- */
/* ----------------------------------------------------------------- */
const libraryContainer = document.getElementById("books-container");
const popup = document.getElementById("popup");

const addNewBook = document.getElementById("btn-add-book");
addNewBook.addEventListener("click", cleanFieldsAndToggle);

let inputTitle = document.getElementById("input-title");
let inputAuthor = document.getElementById("input-author");
let inputPages = document.getElementById("input-pages");
let inputRead = document.getElementById("input-read");

const btnPopupAdd = document.getElementById("btn-popup-add-book");
btnPopupAdd.addEventListener("click", addBookToLibraryArray);

const btnPopupCancel = document.getElementById("btn-popup-cancel");
btnPopupCancel.addEventListener("click", cleanFieldsAndToggle);

function cleanFieldsAndToggle() {
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;

    popup.classList.toggle("show");

    const newTitle = document.getElementById("input-title");
    newTitle.classList.remove("input-required");
}

function addBookToLibraryArray() {
    const newTitle = document.getElementById("input-title");
    let newAuthor = document.getElementById("input-author").value;
    let newPages = document.getElementById("input-pages").value;
    const newRead = document.getElementById("input-read").checked;

    if (newAuthor.length < 1) newAuthor = "Unknown";
    if (newPages.length < 1) newPages = "Unknown";

    if (newTitle.value.length < 1) {
        newTitle.focus();
        newTitle.classList.toggle("input-required");
    } else {
        const newBook = new Book(newTitle.value, newAuthor, newPages, newRead);
        libraryArray.push(newBook);
        cleanFieldsAndToggle();
        refreshLibrary();
    }
}

function refreshLibrary() {
    /**Refresh and shows items in the interface */

    const libraryContainer = document.getElementById("library-container");

    /* Delete the current books container including its child elements */
    const oldBooksContainer = document.getElementById("books-container");
    oldBooksContainer.remove();

    /* Create a new container to add the updated collection 
    from the libraryArray */
    const booksContainer = document.createElement("div");
    booksContainer.classList.add("books-container");
    booksContainer.setAttribute("id", "books-container");
    libraryContainer.appendChild(booksContainer);

    libraryArray.forEach((book) => {
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
}
