const libraryArray = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

// Book.prototype.getDetails = function () {
//     return (
//         "Title: " +
//         this.title +
//         "\n" +
//         "Author: " +
//         this.author +
//         "\n" +
//         "Number of pages: " +
//         this.pages +
//         "\n" +
//         "Has this book been read?: " +
//         this.isRead
//     );
// };

/**
 * Global variables linked to the sort functions
 */
let sortAsc = true;
let sortBy = "title"; //title, author, pages, read

/* Testing */
const test = new Book(
    "Harry Potter and the Philosopher's Stone",
    "J. K. Rowling",
    223,
    true
);
const test2 = new Book(
    "Principles for Dealing with the Changing World Order",
    "Ray Dalio",
    336,
    false
);
const test3 = new Book(
    "Sorting array of objects",
    "developer.mozilla.org",
    36,
    true
);
libraryArray.push(test);
libraryArray.push(test2);
libraryArray.push(test3);

// console.log(test.getDetails());

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

/**
 * Add functionality to the sorting buttons in the navbar
 */
[...document.getElementsByClassName("sort-btn")].forEach((btn) => {
    btn.addEventListener("click", setSortingVariables);
});

function cleanFieldsAndToggle() {
    /**
     * Clean fields from the popup form and remove the class input-required.
     * Necessary action to get an empty form once the popup window is open again.
     */
    inputTitle.value = "";
    inputAuthor.value = "";
    inputPages.value = "";
    inputRead.checked = false;

    popup.classList.toggle("show");

    const newTitle = document.getElementById("input-title");
    newTitle.classList.remove("input-required");
}

function addBookToLibraryArray() {
    /**
     * Create a new Book instance from the input form fields and save it in
     * the LibraryArray
     */
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

    //Sort the array before printing it
    sortLibrary();
    libraryArray.forEach((book) => {
        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book");

        const bookTitle = document.createElement("div");
        bookTitle.classList.add("book-title");
        bookTitle.textContent =
            book.title.length > 40
                ? book.title.slice(0, 39) + "..."
                : book.title;
        bookTitle.setAttribute("title", book.title);

        const bookAuthor = document.createElement("div");
        bookAuthor.classList.add("book-author");
        bookAuthor.textContent =
            book.author.length > 25
                ? book.author.slice(0, 24) + "..."
                : book.author;
        bookAuthor.setAttribute("title", book.author);

        const bookPages = document.createElement("div");
        bookPages.classList.add("book-pages");
        bookPages.textContent = book.pages;

        const bookRead = document.createElement("div");
        bookRead.classList.add("book-read");
        bookRead.textContent = book.isRead;

        const bookActions = document.createElement("div");
        bookActions.classList.add("book-actions");
        const btnEditBook = document.createElement("button");
        btnEditBook.textContent = "Edit";
        const btnDeleteBook = document.createElement("button");
        btnDeleteBook.textContent = "Delete";
        btnDeleteBook.addEventListener("click", deleteBook);

        booksContainer.appendChild(bookContainer);
        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPages);
        bookContainer.appendChild(bookRead);
        bookContainer.appendChild(bookActions);

        bookActions.appendChild(btnEditBook);
        bookActions.appendChild(btnDeleteBook);
    });
}

function setSortingVariables(e) {
    switch (e.target.id) {
        case "sort-asc":
            sortAsc = true;
            break;
        case "sort-des":
            sortAsc = false;
            break;
        case "sort-title":
            sortBy = "title";
            break;
        case "sort-author":
            sortBy = "author";
            break;
        case "sort-pages":
            sortBy = "pages";
            break;
        case "sort-read":
            sortBy = "read";
            break;
        default:
            break;
    }

    refreshLibrary();
    console.log("click within setSortingVariables function: " + e.target.id);
}

function sortLibrary() {
    libraryArray.sort((a, b) => {
        const valA =
            typeof a[sortBy] == "string" ? a[sortBy].toUpperCase() : a[sortBy]; // ignore upper and lowercase
        const valB =
            typeof b[sortBy] == "string" ? b[sortBy].toUpperCase() : b[sortBy]; // ignore upper and lowercase
        if (valA < valB) return -1;
        if (valA > valB) return 1;

        // values must be equal
        return 0;
    });

    if (!sortAsc) {
        libraryArray.reverse();
    }
}

function deleteBook() {
    libraryArray.splice(
        libraryArray.indexOf(
            libraryArray.find(({ title }) =>
                title.toLowerCase().includes(this.title)
            )
        ),
        1
    );

    refreshLibrary();
}

/*libraryArray.indexOf(libraryArray.find(({ title }) => title.toLowerCase().includes("potter")));*/
