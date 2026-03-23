import { useState, useMemo, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SortFilterBar from './components/SortFilterBar';
import BookGrid from './components/BookGrid';
import { fetchBooks } from './api';
import { filterByQuery, filterByDecade, sortBooks, paginateBooks, PAGE_SIZE } from './utils';

// --- localStorage helpers ---
function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // silently ignore quota errors
  }
}

export default function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [filterDecade, setFilterDecade] = useState('all');
  const [darkMode, setDarkMode] = useState(() => loadFromStorage('darkMode', true));
  const [readBooks, setReadBooks] = useState(() => loadFromStorage('readBooks', []));
  const [favorites, setFavorites] = useState(() => loadFromStorage('favorites', []));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [query, sortOption, filterDecade]);

  // Persist readBooks to localStorage on every update
  useEffect(() => {
    saveToStorage('readBooks', readBooks);
  }, [readBooks]);

  // Persist favorites to localStorage on every update
  useEffect(() => {
    saveToStorage('favorites', favorites);
  }, [favorites]);

  // Persist dark mode preference
  useEffect(() => {
    saveToStorage('darkMode', darkMode);
  }, [darkMode]);

  const handleSearch = useCallback(async (searchQuery) => {
    setQuery(searchQuery);
    setLoading(true);
    setError('');
    setHasSearched(true);
    try {
      const results = await fetchBooks(searchQuery);
      setBooks(results);
    } catch {
      setError('Something went wrong. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleRead = (bookId) => {
    setReadBooks((prev) =>
      prev.includes(bookId) ? prev : [...prev, bookId]
    );
  };

  const handleToggleFavorite = (bookId) => {
    setFavorites((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  // Use .reduce() to compute the total read count
  const readCount = readBooks.reduce((count) => count + 1, 0);

  // Chain: filter by query → filter by decade → sort
  // Then optionally filter to favorites only
  const filteredBooks = useMemo(() => {
    let result = filterByQuery(books, query);
    result = filterByDecade(result, filterDecade);
    result = sortBooks(result, sortOption);

    if (showFavoritesOnly) {
      result = result.filter((book) => favorites.includes(book.id));
    }

    return result;
  }, [books, query, sortOption, filterDecade, showFavoritesOnly, favorites]);

  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / PAGE_SIZE));
  const paginatedBooks = useMemo(
    () => paginateBooks(filteredBooks, currentPage),
    [filteredBooks, currentPage]
  );

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
        readCount={readCount}
        showFavoritesOnly={showFavoritesOnly}
        toggleShowFavorites={() => setShowFavoritesOnly((prev) => !prev)}
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
          books={paginatedBooks}
          loading={loading}
          error={error}
          hasSearched={hasSearched}
          query={query}
          showFavoritesOnly={showFavoritesOnly}
          readBooks={readBooks}
          favorites={favorites}
          onToggleRead={handleToggleRead}
          onToggleFavorite={handleToggleFavorite}
        />
        {hasSearched && !loading && !error && filteredBooks.length > 0 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ← Previous
            </button>
            <span className="pagination-label">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
