
/* =========================================
   THE LIBRARY — BOOK DATABASE
   Add your books inside this array.
   ========================================= */

const books = [
  {
    id: "specimens-greek-tragedy",
    title: "Specimens of Greek Tragedy",
    author: "Aeschylus, Sophocles & Euripides",
    type: "Annotated Edition",
    description: "A carefully prepared collection of Greek tragedy with original introductory material and annotations.",
    coverTitle: "Greek\nTragedy",
    readUrl: "books/specimens-of-greek-tragedy.pdf",
    luluUrl: "https://www.lulu.com/",
    featured: true
  },

  {
    id: "the-united-kingdom",
    title: "The United Kingdom",
    author: "A Political History",
    type: "Annotated Edition",
    description: "A historical study presented as a durable reading edition for students and independent readers.",
    coverTitle: "The\nUnited\nKingdom",
    readUrl: "books/the-united-kingdom.pdf",
    luluUrl: "https://www.lulu.com/",
    featured: false
  },

    {
    id: "the-science-of-religions",
    title: "The Science of Religions",
    author: "Émile Burnouf",
    type: "Annotated English Translation",
    description: "An annotated English translation of Émile Burnouf's 1872 study of comparative religion, with a translator's introduction and historical context.",
    coverTitle: "The Science\nof Religions",
    readUrl: "books/the-science-of-religions.pdf",
    luluUrl: "",
    featured: true
  }
   
];


/* =========================================
   ELEMENTS
   ========================================= */

const grid = document.getElementById("bookGrid");
const searchInput = document.getElementById("bookSearch");
const resultsLabel = document.getElementById("searchResults");
const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");


/* =========================================
   HTML SECURITY
   ========================================= */

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}


/* =========================================
   BOOK COVER
   ========================================= */

function coverMarkup(book) {
  return `
    <div class="card-cover">
      <span class="cover-rule"></span>
      <span class="cover-small">THE LIBRARY</span>
      <span class="cover-title">
        ${escapeHtml(book.coverTitle).replace(/\n/g, "<br>")}
      </span>
      <span class="cover-small">${escapeHtml(book.type)}</span>
      <span class="cover-rule"></span>
    </div>
  `;
}


/* =========================================
   SEARCH ENGINE
   Searches only books in the array.
   ========================================= */

function searchBooks(searchTerm = "") {

  const query = searchTerm.trim().toLowerCase();

  // Every entry in the books array is an actual catalogue entry.
  const results = books.filter(book => {

    const searchableContent = [
      book.title,
      book.author,
      book.type,
      book.description
    ].join(" ").toLowerCase();

    return searchableContent.includes(query);

  });

  renderBooks(results);

  // Update result counter.
  if (query === "") {

    resultsLabel.textContent =
      `${results.length} ${results.length === 1 ? "volume" : "volumes"} in the catalogue`;

  } else {

    resultsLabel.textContent =
      `${results.length} ${results.length === 1 ? "volume" : "volumes"} found`;

  }
}


/* =========================================
   DISPLAY BOOKS
   ========================================= */

function renderBooks(results) {

  if (results.length === 0) {

    grid.innerHTML = `
      <div class="no-results">
        <span class="no-results-icon">✦</span>

        <h3>No volumes found.</h3>

        <p>
          We could not find a book matching your search.
          Try another title, author or subject.
        </p>

      </div>
    `;

    return;
  }

  grid.innerHTML = results.map(book => `

    <article class="book-card">

      ${coverMarkup(book)}

      <div class="card-body">

        <span class="card-type">
          ${escapeHtml(book.type)}
        </span>

        <h3 class="card-title">
          ${escapeHtml(book.title)}
        </h3>

        <div class="card-author">
          ${escapeHtml(book.author)}
        </div>

        <p class="card-description">
          ${escapeHtml(book.description)}
        </p>

        <div class="card-actions">

          <a
            class="button button-gold"
            href="book.html?id=${encodeURIComponent(book.id)}"
          >
            Read
          </a>

        </div>

      </div>

    </article>

  `).join("");

}


/* =========================================
   LIVE SEARCH
   ========================================= */

searchInput.addEventListener("input", event => {

  searchBooks(event.target.value);

});


/* =========================================
   MOBILE NAVIGATION
   ========================================= */

menuButton.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("mobile-open");

  menuButton.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

});


document.querySelectorAll(".nav a").forEach(link => {

  link.addEventListener("click", () => {

    nav.classList.remove("mobile-open");

    menuButton.setAttribute("aria-expanded", "false");

  });

});


/* =========================================
   FOOTER YEAR
   ========================================= */

document.getElementById("year").textContent =
  new Date().getFullYear();


/* =========================================
   INITIALISE CATALOGUE
   ========================================= */

searchBooks();
