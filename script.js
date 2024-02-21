// Library array
const myLibrary = []

//DOM library container
const libCont = document.querySelector(".library-container")

// add book modal
const showBtn = document.getElementById("add-button")
const dialog = document.getElementById("dialog")
const submitBtn = dialog.querySelector("#submit")
const cancelBtn = dialog.querySelector("#cancel")

//fetch all relevant input objects from modal
const bookInp = dialog.querySelectorAll(
  "input[type = 'text'],[type = 'checkbox']"
)

// Modal buttons
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

// Class constructor for individual books

class Book {
  constructor(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
  }
  toggleRead() {
    if (this.read === true) {
      this.read = false
    } else {
      this.read = true
    }
  }
}
/* // Constructor for individual books
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read 
}*/
/* // Add function to constructor prototype to toggle read state
Book.prototype.toggleRead = function () {
  if (this.read === true) {
    this.read = false
  } else {
    this.read = true
  }
} */

// Main function to add book to library and DOM
function addBookToLibrary(title, author, pages, read) {
  // Create new book object through constructor, add to Array.
  let book = new Book(title, author, pages, read)
  myLibrary.push(book)

  //display updated array of books
  myLibrary.forEach((book) => {
    if (book.addedToLib !== true) {
      const bookCard = createBookCard(book)
      libCont.appendChild(bookCard)

      // Once book is added to Library, set addedToLib to true
      // this prevents deploying it to the DOM again.
      book.addedToLib = true
    }
  })
}

// Function to create book card for each book entry
function createBookCard(book) {
  // Card container
  const div = document.createElement("div")
  div.classList.add("book-card")

  // Function creates a label and paragraph
  function createLabelAndElement(labelText, value, className) {
    const label = document.createElement("label")
    label.classList.add("label")
    label.textContent = labelText

    const para = document.createElement("p")
    para.classList.add(className)
    para.textContent = value

    label.appendChild(para)
    return label
  }
  // Append div 3 times, calling createLabelAndElement for each book.value
  div.appendChild(createLabelAndElement("Book: ", book.title, "title"))
  div.appendChild(createLabelAndElement("By: ", book.author, "author"))
  div.appendChild(createLabelAndElement("Pages: ", book.pages, "pages"))

  // Create element for checkbox, if book is read
  const chkLabel = document.createElement("label")
  chkLabel.setAttribute("for", "readChk")
  chkLabel.classList.add("label")
  chkLabel.textContent = "Read: "

  const readChk = document.createElement("input")
  readChk.setAttribute("type", "checkbox")
  readChk.checked = book.read
  // Trigger object prototype function on checkmarker clickc
  readChk.addEventListener("click", () => {
    book.toggleRead()
  })
  chkLabel.append(readChk)
  div.appendChild(chkLabel)

  // Button for deleting book from DOM and array
  const delBtn = document.createElement("button")
  delBtn.textContent = "Remove"
  delBtn.addEventListener("click", (e) => {
    myLibrary.splice(book.bookId, 1)
    div.parentNode.removeChild(div)
  })
  div.appendChild(delBtn)

  // Return finished book-card
  return div
}
