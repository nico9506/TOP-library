const libraryArray = [];
let bookToEdit = undefined;

function uniqueID() {
    /**
     * Generates an unique ID. Used to identify each book object
     */
    return Math.floor(Math.random() * Date.now());
}

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.id = uniqueID();
    }
}

/**
 * Global variables linked to the sort functions
 */
let sortAsc = true;
let sortBy = "title"; //title, author, pages, read

/* Testing 
    Books preloaded to be displayed once the site is loaded
*/
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
const test3 = new Book("Lord of the Flies", "William Golding", 224, true);

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

const btnPopupAdd = document.getElementById("btn-popup-save-book");
btnPopupAdd.addEventListener("click", updateLibraryArray);

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

    inputTitle.classList.remove("input-required");
}

function updateLibraryArray() {
    /**
     * Create or modify a Book instance from the input form fields and save
     * it in the LibraryArray
     */

    if (inputAuthor.value.length < 1) inputAuthor.value = "Unknown";
    if (inputPages.value.length < 1) inputPages.value = undefined;

    if (inputTitle.value.length < 1) {
        inputTitle.focus();
        inputTitle.classList.toggle("input-required");
    } else if (bookToEdit !== undefined) {
        //Check if the object exists before trying to edit it
        bookToEdit.title = inputTitle.value;
        bookToEdit.author = inputAuthor.value;
        bookToEdit.pages = inputPages.value;
        bookToEdit.isRead = inputRead.checked;
        cleanFieldsAndToggle();
        refreshLibrary();
    } else {
        const newBook = new Book(
            inputTitle.value,
            inputAuthor.value,
            inputPages.value,
            inputRead.checked
        );
        libraryArray.push(newBook);
        cleanFieldsAndToggle();
        refreshLibrary();
    }

    bookToEdit = undefined;
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
        bookRead.innerHTML = book.isRead
            ? "<i class='fa-solid fa-check'></i>"
            : "<i class='fa-solid fa-xmark'></i>";

        const bookActions = document.createElement("div");
        bookActions.classList.add("book-actions");

        const btnEditBook = document.createElement("button");
        btnEditBook.innerHTML =
            "Edit <i class='fa-solid fa-pen-to-square'></i>";
        //The unique book id is saved also as this btn id-like attribute
        btnEditBook.setAttribute("bookId", book.id);
        btnEditBook.addEventListener("click", editBookInLibraryArray);

        const btnDeleteBook = document.createElement("button");
        btnDeleteBook.innerHTML = "Delete <i class='fa-solid fa-trash'></i>";
        //The unique book id is saved also as this btn id-like attribute
        btnDeleteBook.setAttribute("bookId", book.id);
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
    /**
     * Remove the book with the same ID of the called DeleteButton (bookId)
     * from the libraryArray
     */
    libraryArray.splice(
        libraryArray.indexOf(
            libraryArray.find(({ id }) => id == this.getAttribute("bookId"))
        ),
        1
    );

    refreshLibrary();
}

function editBookInLibraryArray() {
    /**
     * Edit a created Book instance from the input form fields
     */

    popup.classList.toggle("show");

    //Save the object to be edited
    bookToEdit = libraryArray.find(
        ({ id }) => id == this.getAttribute("bookId")
    );

    if (bookToEdit !== undefined) {
        //Prefill the popup fields with the book attributes
        document.getElementById("input-title").value = bookToEdit.title;
        document.getElementById("input-author").value = bookToEdit.author;
        document.getElementById("input-pages").value = bookToEdit.pages;
        document.getElementById("input-read").checked = bookToEdit.isRead;
    }
}
