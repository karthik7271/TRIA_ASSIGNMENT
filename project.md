# Contact List — Implementation Prompt & Guidelines

## 1. Project summary

Build a single-page React application that displays and manages a Contact List. The app should be visually polished, responsive, accessible, and include a clear developer-friendly API contract and folder structure. The core features are: viewing contacts and searching by name. Bonus features should make the app stand out (see *Nice-to-have*).

**Primary goals:**

* Demonstrate React component design and state management
* Show API interaction (mocked or real)
* Good UX/UI, accessibility, and polish
* Clear README, tests, and deployment setup

---

## 2. Deliverables

* A working React app implementing required features
* A `README.md` with setup, run, and deployment instructions
* A brief design decisions section (why you chose libs, patterns)
* At least unit tests for core components and an E2E smoke test
* A `mock` API (MSW or JSON Server) or a small real API (optional)

---

## 3. Tech stack (recommended)

* **React** (v18+)
* **TypeScript** (strongly recommended for a production-y project)
* **Vite** (fast dev tooling) or Create React App if you prefer
* **Tailwind CSS** for rapid, consistent styling
* **React Query / TanStack Query** for API state (optional but recommended)
* **Zustand** or **Redux Toolkit** for global UI state (theme, selected contact) if needed
* **React Router** (optional; single-page may not require multiple routes)
* **MSW (Mock Service Worker)** to mock the backend during dev/tests
* **Jest + React Testing Library** for unit tests
* **Playwright** or **Cypress** for an E2E test
* **ESLint + Prettier + Husky** for linting, formatting and pre-commit checks

**Why these choices:** TypeScript + React gives type safety and clarity. Tailwind keeps UI consistent. React Query simplifies data fetching and caching. MSW makes the mock API realistic and easy to test.

---

## 4. UX / Visual / Style Guidelines

* Use a clean, modern layout with a left column for controls and a main pane for results (responsive — single column on mobile).
* Use a neutral palette with 1-2 accent colors. Provide a dark-mode toggle.
* Typography: clear hierarchy (H1 large, H2 medium, body base). Use system fonts or Google Font (Inter).
* Use cards/list rows with subtle shadows and 8–12px border radii.
* Hover states, focus outlines (visible for keyboard), and subtle transitions (150ms) for interactive elements.
* Inputs must have labels and accessible descriptions.

**Component visual examples:**

* Top bar with app title and search input
* Contacts list: each row shows avatar, full name, company/job title (subtle), primary contact method (email/phone), and star (favorite)
* Right or modal panel to add/edit contact
* Empty states with illustration and CTA to add contact
* Error toast/snackbar for API errors

---

## 5. Required features (must-have)

1. **View contacts**

   * Fetch contact list from an API (mocked is fine) and render as a scrollable list.
   * Show avatar, full name, job title/company, email, phone and favorite status.
   * Clicking a contact opens a small detail view or modal.
2. **Search by name**

   * Search box that filters by first name, last name or full name.
   * Debounce user input (suggested 300ms).
   * Minimum characters: 2 (configurable).
   * Matches should be highlighted in the results.
3. **Accessibility**

   * Keyboard navigable list (arrow keys to move, Enter to open).
   * Proper ARIA roles for list, listitem, and modal.
   * High contrast and focus styles.
4. **Responsive**

   * Works across mobile, tablet, desktop.

---

## 6. Optional / Nice-to-have features (choose at least a few)

* **Add a new contact** — form in modal or slide-over with validation.
* **Edit / Delete contact** (CRUD) with confirmation.
* **Mark favorite** (toggle star) and sort/filter by favorites.
* **Tagging / Groups** — let user add tags and filter by tags.
* **Pagination / Infinite scroll / Virtualized list** for large lists (react-window).
* **Local cache & offline fallback** — use React Query + localStorage when offline.
* **Import / Export CSV** for contact list.
* **Dark mode** with persisted preference.
* **Bulk actions** (select multiple, delete/export).
* **Animations** for list changes using Framer Motion.
* **Profile avatars** — generated (initials) or pulled from an avatar service.

---

## 7. Data model & API contract (mock)

Design the app to work with a REST-style API. Example endpoints and sample responses:

**GET /contacts?search={q}&page={p}&limit={l}**

```json
{
  "data": [
    {
      "id": "c1a7b0ff-...",
      "firstName": "Asha",
      "lastName": "Sharma",
      "email": "asha@example.com",
      "phone": "+91-9876543210",
      "avatarUrl": null,
      "company": "Acme Co.",
      "jobTitle": "Product Designer",
      "tags": ["design","india"],
      "favorite": true,
      "createdAt": "2025-10-01T12:00:00.000Z",
      "updatedAt": "2025-10-01T12:00:00.000Z"
    }
  ],
  "meta": { "page": 1, "limit": 20, "total": 120 }
}
```

**POST /contacts** (create)

* Request: contact object (firstName, lastName, email, phone, ...)
* Response: created contact with `id`.

**PUT /contacts/:id** (update)
**DELETE /contacts/:id** (delete)

> Implementation tip: use MSW to intercept these endpoints locally. Alternatively, run `json-server` against a `db.json`.

---

## 8. Sample Contact JSON (single item)

```json
{
  "id": "e8f9a8b2-...",
  "firstName": "Uday",
  "lastName": "Srivastava",
  "email": "uday@example.com",
  "phone": "+91-9999999999",
  "avatarUrl": null,
  "company": "Example Labs",
  "jobTitle": "Software Engineer",
  "tags": ["engineering","friend"],
  "favorite": false,
  "createdAt": "2025-09-15T09:00:00.000Z",
  "updatedAt": "2025-09-15T09:00:00.000Z"
}
```

---

## 9. Component breakdown (suggested)

* `App` — root, theme provider, router
* `TopBar` — title, global search, add button, theme toggle
* `ContactsPage` — main page container
* `ContactsFilter` — search input, filter chips (favorites, tags)
* `ContactList` — virtualized list or plain list
* `ContactItem` — single row/card (avatar, name, meta, actions)
* `ContactDetail` — modal or side panel with full info
* `ContactForm` — create/edit form with validation
* `EmptyState`, `ErrorBanner`, `Toast` — common UI
* `api/contacts` — functions to call the API
* `hooks/useContacts` — data fetching hook (React Query)

---

## 10. Folder structure (recommended)

```
/src
  /components
    TopBar.tsx
    ContactItem.tsx
    ContactList.tsx
    ContactForm.tsx
    ContactDetail.tsx
    EmptyState.tsx
  /pages
    ContactsPage.tsx
  /hooks
    useContacts.ts
  /api
    contacts.ts
  /mocks
    handlers.ts (MSW)
    data.ts
  /utils
    format.ts
    validators.ts
  /styles
    tailwind.css
  main.tsx
  App.tsx
```

---

## 11. UX details & edge cases (acceptance criteria)

* Loading states: skeleton rows when fetching.
* Empty results: show message and CTA to add contact.
* Error states: retry button on network failure.
* Search behavior: debounced, case-insensitive, highlight matches.
* Form validations: required fields (firstName, lastName OR fullName), email format, phone format (optional), max tag count.
* Prevent duplicate emails (front-end check with warning).
* Confirmations for destructive actions (e.g., delete).
* Accessible labels for all controls; ensure modals trap focus.

---

## 12. Performance considerations

* Use list virtualization (react-window) when > 200 items.
* Debounce search input to avoid excessive requests.
* Cache list pages with React Query and provide optimistic updates for favorites.

---

## 13. Testing

* Unit tests for `ContactItem`, `ContactList`, and `ContactForm` using React Testing Library.
* Mock API responses with MSW in tests.
* E2E test (Playwright or Cypress): load page, perform search, open contact, add contact.
* Aim for at least ~70% coverage for core UI logic. (Higher is a plus.)

---

## 14. Accessibility checklist

* All inputs have `label` elements.
* Keyboard access to list and actions.
* Proper semantic HTML (list and listitem, buttons not `div`)
* ARIA roles and attributes on modal and dynamic content
* Contrast ratio meets WCAG AA for body text

---

## 15. README template (what to include)

* Project description
* Tech stack summary
* Setup instructions: `npm install`, `npm run dev`, `npm run test` etc.
* How to run mock API (MSW or json-server)
* Deployment instructions (Vercel/Netlify)
* How to run tests and E2E
* Notes on design decisions and future improvements

---

## 16. Deployment & CI

* Host on Vercel or Netlify (one-click good). Add a `vercel.json` or `netlify.toml` if needed.
* Add GitHub Actions for CI: run `npm ci`, `npm run build`, `npm test`.

---

## 17. Evaluation rubric (for reviewers)

**Functionality (40%)** — Core features work (view & search). Add contact if included.
**Code quality (20%)** — Readable, modular, TypeScript types, consistent style.
**UX & Design (15%)** — Polished visuals, responsive layout, accessible.
**Testing (10%)** — Unit tests and a simple E2E flow.
**Extras & polish (15%)** — Nice-to-have features, animations, performance.

---

## 18. Sample commands (quick start)

```bash
# create project
npm create vite@latest contact-list -- --template react-ts
cd contact-list
npm install
# recommended libs
npm install tailwindcss @tanstack/react-query msw axios react-router-dom zustand
# dev
npm run dev
# tests
npm run test
# build
npm run build
```

---

## 19. Small UI wireframe (text)

```
[TopBar]  Contact List             [Search input] [Add] [Theme]

[Left column - Filters]         [Main column - Contacts]
  • Favorites                    ┌────────────────────────────────────────┐
  • Tags                        │ [Avatar]  Uday Srivastava         ⋯  │
  • Sort: A-Z / Recent          │    Software Engineer                 ★ │
  • Clear filters               │ [Avatar]  Asha Sharma                 │
                                │    Product Designer                   │
                                │ ...                                   │
                                └────────────────────────────────────────┘
```

---

## 20. Final notes (what to hand in)

* A GitHub repo link with a clear `README.md` and live demo link (Vercel/Netlify).
* A short write-up (1–2 paragraphs) explaining: main choices you made, how to run the app, and what to add next.
