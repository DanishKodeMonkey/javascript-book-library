const myLibrary = []
const libCont = document.querySelector(".library-container")

// add book modal
const showBtn = document.getElementById("add-button")
const dialog = document.getElementById("dialog")
const submitBtn = dialog.querySelector("#submit")
const cancelBtn = dialog.querySelector("#cancel")

//fetch all relevant input objects
const bookInp = dialog.querySelectorAll(
  "input[type = 'text'],[type = 'checkbox']"
)

submitBtn.addEventListener("click", (e) => {
  // Prevent default server send behavior
  e.preventDefault()

  // Assign values from input objects to variables.
  const title = bookInp[0].value.trim()
  const author = bookInp[1].value.trim()
  const pages = bookInp[2].value.trim()
  const isRead = bookInp[3].checked

  //Call the addBookToLibrary function with new variables
  addBookToLibrary(title, author, pages, isRead)
  dialog.close()
})
showBtn.addEventListener("click", () => {
  dialog.showModal()
})
cancelBtn.addEventListener("click", (e) => {
  e.preventDefault()
  dialog.close()
})

// Constructor for individual books
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    console.log(
      `Book: ${this.title}, by ${this.author}, with ${this.pages} pages, is it read? ${this.read}`
    )
  }
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read)

  myLibrary.push(book)

  // Display updated array of books
  myLibrary.forEach((book) => {
    //Check if book was already added to DOM
    if (book.addedToLib !== true) {
      const div = document.createElement("div")
      div.classList.add("book-card")
      titleLabel = document.createElement("label")
      titleLabel.classList.add("label")
      titleLabel.setAttribute[("for", "title")]
      titleLabel.textContent = "Book: "
      const title = document.createElement("p")
      title.classList.add("title")
      title.textContent = book.title
      titleLabel.appendChild(title)
      authorLabel = document.createElement("label")
      authorLabel.classList.add("label")
      authorLabel.setAttribute[("for", "author")]
      authorLabel.textContent = "By: "
      const author = document.createElement("p")
      author.classList.add("author")
      author.textContent = book.author
      authorLabel.appendChild(author)
      pagesLabel = document.createElement("label")
      pagesLabel.classList.add("label")
      pagesLabel.setAttribute[("for", "pages")]
      pagesLabel.textContent = "Pages: "
      const pages = document.createElement("p")
      pages.classList.add("pages")
      pages.textContent = book.pages
      pagesLabel.appendChild(pages)
      const chkLabel = document.createElement("label")
      chkLabel.setAttribute[("for", "readChk")]
      chkLabel.classList.add("label")
      chkLabel.textContent = "Read: "
      const readChk = document.createElement("input")
      readChk.setAttribute("type", "checkbox")
      readChk.checked = book.read
      chkLabel.appendChild(readChk)

      // Add function to each book to remove itself
      // from DOM and myLibrary
      book["bookId"] = myLibrary.indexOf(book)
      const delBtn = document.createElement("button")
      delBtn.textContent = "Remove"
      delBtn.addEventListener("click", (e) => {
        myLibrary.splice(book.bookId, 1)
        div.parentNode.removeChild(div)
      })
      div.append(titleLabel, authorLabel, pagesLabel, chkLabel, delBtn)
      libCont.appendChild(div)

      // Once book is added, set label on array entry.
      // This way the same entries from the array aren't added twice.
      // And books with matching titles can still exist.
      book["addedToLib"] = true
    }
  })
}
