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
    id: "coming-soon",
    title: "The Next Volume",
    author: "Coming soon",
    type: "New Edition",
    description: "Another volume is being prepared for the shelves. Check back soon for the next release.",
    coverTitle: "Coming\nSoon",
    readUrl: "#",
    luluUrl: "#",
    featured: false
  }
];

const grid = document.getElementById("bookGrid");
const modal = document.getElementById("bookModal");
const menuButton = document.getElementById("menuButton");
const nav = document.querySelector(".nav");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[char]));
}

function coverMarkup(book, compact = false) {
  return `
    <div class="card-cover">
      <span class="cover-rule"></span>
      <span class="cover-small">THE LIBRARY</span>
      <span class="cover-title">${escapeHtml(book.coverTitle).replace(/\n/g, "<br>")}</span>
      <span class="cover-small">${escapeHtml(book.type)}</span>
      <span class="cover-rule"></span>
    </div>`;
}

function renderBooks() {
  grid.innerHTML = books.map(book => `
    <article class="book-card">
      ${coverMarkup(book)}
      <div class="card-body">
        <span class="card-type">${escapeHtml(book.type)}</span>
        <h3 class="card-title">${escapeHtml(book.title)}</h3>
        <div class="card-author">${escapeHtml(book.author)}</div>
        <p class="card-description">${escapeHtml(book.description)}</p>
        <div class="card-actions">
          <a class="button button-gold" href="book.html?id=${encodeURIComponent(book.id)}">Read</a>
        </div>
      </div>
    </article>
  `).join("");
}

function openBook(id) {
  const book = books.find(item => item.id === id);
  if (!book) return;

  document.getElementById("modalMeta").textContent = book.type;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = book.author;
  document.getElementById("modalDescription").textContent = book.description;
  document.getElementById("modalCover").innerHTML = coverMarkup(book);

  const readButton = document.getElementById("readButton");
  const buyButton = document.getElementById("buyButton");
  readButton.href = book.readUrl;
  buyButton.href = book.luluUrl;

  readButton.style.display = book.readUrl === "#" ? "none" : "inline-flex";
  buyButton.style.display = book.luluUrl === "#" ? "none" : "inline-flex";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach(el => {
  el.addEventListener("click", closeModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});

menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("mobile-open");
  menuButton.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("mobile-open"));
});

document.getElementById("year").textContent = new Date().getFullYear();
renderBooks();
