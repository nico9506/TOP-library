const library = [];

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
const library = document.getElementById('books-container');