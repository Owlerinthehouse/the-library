# The Library — GitHub Pages starter

A polished, dependency-free static storefront for a personal book catalogue.

## Folder structure

- `index.html` — main Library page
- `styles.css` — visual design
- `app.js` — book catalogue and buttons
- `books/` — put your PDF reading editions here
- `images/` — optional cover images and future artwork

## How the book flow works

The catalogue now has one main **Read** button. Clicking it opens `book.html?id=...`, where the reader chooses between:

- **Read the PDF**
- **Order a physical copy**

Each option is controlled by the `readUrl` and `luluUrl` fields in `app.js`.

## Add a book

Open `app.js` and add another object to the `books` array.

Change:
- `title`
- `author`
- `type`
- `description`
- `coverTitle`
- `readUrl`
- `luluUrl`

For example:

```js
{
  id: "my-book",
  title: "My Book",
  author: "Athena Mian",
  type: "Annotated Edition",
  description: "Short description of the book.",
  coverTitle: "My\nBook",
  readUrl: "books/my-book.pdf",
  luluUrl: "https://www.lulu.com/your-book-link"
}
```

## GitHub Pages

This is a static site, so it can be published directly with GitHub Pages.

Recommended repository layout:

```text
the-library/
├── index.html
├── styles.css
├── app.js
├── books/
└── images/
```

Do not put Lulu API credentials in these files.

## Lulu integration plan

The first version intentionally sends the customer to the official Lulu product page.

For a true integrated checkout later, use a secure backend/serverless function. Lulu's Print API supports print-order creation, live cost calculation, sandbox testing, and webhooks. The browser should never receive the Lulu API secret.

A future architecture can be:

Visitor → The Library frontend → secure checkout/backend → Lulu Print API → Lulu fulfillment

The backend can also receive Lulu webhook events and store order status.

## Design direction

Palette:
- Forest green: `#102b21`
- Deep green: `#183d2e`
- Antique gold: `#c8a45d`
- Warm paper: `#fbf8f0`
- Ink: `#101310`

The design deliberately avoids a generic modern SaaS appearance. It uses classical serif typography, restrained gold detailing, warm paper tones, generous spacing, and a quiet library atmosphere.
