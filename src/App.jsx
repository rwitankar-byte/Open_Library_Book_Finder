import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import SortFilterBar from './components/SortFilterBar';
import BookGrid from './components/BookGrid';
import { fetchBooks } from './api';
import { filterByQuery, filterByDecade, sortBooks } from './utils';

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
    } catch (err) {
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
  const processedBooks = useMemo(() => {
    let result = filterByQuery(books, query);
    result = filterByDecade(result, filterDecade);
    result = sortBooks(result, sortOption);

    if (showFavoritesOnly) {
      result = result.filter((book) => favorites.includes(book.id));
    }

    return result;
  }, [books, query, sortOption, filterDecade, showFavoritesOnly, favorites]);

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
          books={processedBooks}
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
      </main>
    </div>
  );
}
