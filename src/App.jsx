import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SortFilterBar from './components/SortFilterBar';
import BookGrid from './components/BookGrid';
import { fetchBooks } from './api';
import { filterByQuery, filterByDecade, sortBooks, getPage, PAGE_SIZE } from './utils';

export default function App() {
  // --- Core data ---
  const [books, setBooks] = useState([]);          // raw results from API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  // --- Search / filter / sort state ---
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterDecade, setFilterDecade] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  // --- User preferences (saved to localStorage) ---
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem('darkMode') ?? 'true');
  });
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites') ?? '[]');
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Save preferences whenever they change
  useEffect(() => { localStorage.setItem('darkMode', JSON.stringify(darkMode)); }, [darkMode]);
  useEffect(() => { localStorage.setItem('favorites', JSON.stringify(favorites)); }, [favorites]);

  // Reset to page 1 when the user changes filters
  useEffect(() => { setCurrentPage(1); }, [query, sortOption, filterDecade]);

  // --- Search handler ---
  // Wrapped in useCallback so the function reference doesn't change on every render.
  // Without this, SearchBar's useEffect sees a "new" onSearch function after every
  // state update, re-triggers the effect, calls the API again — infinite loop.
  const handleSearch = useCallback(async (searchTerm) => {
    setQuery(searchTerm);
    setLoading(true);
    setError('');
    setHasSearched(true);

    try {
      const results = await fetchBooks(searchTerm);
      setBooks(results);
    } catch {
      setError('Something went wrong. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []); // empty array = create this function once, never recreate it

  // --- Toggle a book in/out of favorites ---
  function toggleFavorite(bookId) {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  }

  // --- Apply filters and sort to the book list ---
  let displayBooks = filterByQuery(books, query);
  displayBooks = filterByDecade(displayBooks, filterDecade);
  displayBooks = sortBooks(displayBooks, sortOption);
  if (showFavoritesOnly) {
    displayBooks = displayBooks.filter((book) => favorites.includes(book.id));
  }

  const totalPages = Math.max(1, Math.ceil(displayBooks.length / PAGE_SIZE));
  const booksOnPage = getPage(displayBooks, currentPage);

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        showFavoritesOnly={showFavoritesOnly}
        toggleShowFavorites={() => setShowFavoritesOnly(!showFavoritesOnly)}
      />

      <main className="main-content">
        <SearchBar onSearch={handleSearch} />
        <SortFilterBar
          sortOption={sortOption}
          filterDecade={filterDecade}
          onSortChange={setSortOption}
          onFilterChange={setFilterDecade}
        />
        <BookGrid
          books={booksOnPage}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          query={query}
          showFavoritesOnly={showFavoritesOnly}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />

        {/* Pagination — only show when there are results */}
        {hasSearched && !loading && !error && displayBooks.length > PAGE_SIZE && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              ← Previous
            </button>
            <span className="pagination-label">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}