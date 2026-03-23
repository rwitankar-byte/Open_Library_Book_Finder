# Open Library Book Finder 📚

A modern, responsive React web application that lets you explore millions of books using the Open Library API. Keep track of what you've read, save your favorites, and discover new titles with a seamless, fast UI.

## Features ✨

- **Fast & Responsive Search**: Find any book by title, author, or topic. Search inputs are debounced (300ms) for optimal performance.
- **Advanced Filtering & Sorting**: 
  - Filter books strictly by decade (e.g., 1990s, 2000s).
  - Sort results by publication year (Newest/Oldest) or alphabetically by title (A-Z/Z-A).
  - Purely powered by JavaScript array Higher-Order Functions (HOFs).
- **Pagination**: Browse through search results effortlessly with built-in pagination (20 books per page).
- **Reading Goal Tracker**: Mark books as "✓ I've Read This" and track your total read count in the navigation bar.
- **Favorites System**: Heart (♥) books you love and access them rapidly via the dedicated "♥ Favorites" tab.
- **Dark/Light Mode**: Beautifully styled themes. Your preference is automatically saved.
- **Persistent State**: Your reading list, favorites list, and dark mode preference are saved to `localStorage` so they never disappear on refresh.
- **Contextual Empty States**: Charming empty states for no search results, an empty favorites list, and an initial welcome hero section.

## Tech Stack 🛠

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Vanilla CSS (Custom properties, CSS Grid, Flexbox, Animations)
- **API**: [Open Library Search API](https://openlibrary.org/dev/docs/api/search)
- **State Management**: React Hooks (`useState`, `useEffect`, `useMemo`, `useCallback`)

## Getting Started 🚀

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <repository-url>
   cd "Open Library Book Finder"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Browser**:
   Open [http://localhost:5173](http://localhost:5173) (or the port provided by Vite in your terminal) to view it in the browser.

## Project Structure 📁

```text
src/
├── api.js                # Open Library API fetching logic
├── utils.js              # Pure HOF utilities (filtering, sorting, pagination)
├── App.jsx               # Main application component & state management
├── index.css             # Global styles and CSS variables
└── components/           # React Components
    ├── Navbar.jsx        # Navigation, tabs, dark mode toggle, and reading counter
    ├── SearchBar.jsx     # Debounced search input
    ├── SortFilterBar.jsx # Dropdowns for sorting and decade filtering
    ├── BookGrid.jsx      # Grid layout for books & contextual empty states
    └── BookCard.jsx      # Individual book display with read/favorite actions
```

## How It Works

- **Data Fetching**: When you search, `App.jsx` calls `api.js` which fetches from the Open Library Search JSON API and formats the payload.
- **Data Pipeline**: The fetched data flows through a chained set of pure functions in `utils.js`: `filterByQuery` → `filterByDecade` → `sortBooks` → `paginateBooks`. This is heavily optimized using React's `useMemo`.
- **Persistence**: `useEffect` hooks listen to changes in your `readBooks`, `favorites`, and `darkMode` states and sync them to the browser's `localStorage`.

---

*Happy Reading!* 📖
