import BookCard from './BookCard';

export default function BookGrid({
  books,
  loading,
  error,
  hasSearched,
  query,
  showFavoritesOnly,
  favorites,
  onToggleFavorite,
}) {
  if (loading) {
    return (
      <div className="book-grid-status">
        <div className="spinner" />
        <p>Searching the library…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="book-grid-status error">
        <span className="status-icon">⚠️</span>
        <p>{error}</p>
      </div>
    );
  }

  if (showFavoritesOnly && books.length === 0) {
    return (
      <div className="book-grid-status empty">
        <span className="status-icon">💛</span>
        <p>No favorites yet. Heart a book to save it here.</p>
      </div>
    );
  }

  if (hasSearched && books.length === 0) {
    return (
      <div className="book-grid-status empty">
        <span className="status-icon">📭</span>
        <p>No books found for "{query}". Try a different search.</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="hero animate-in">
        <p className="hero-eyebrow">Powered by Open Library · 20M+ Books</p>
        <h2 className="hero-headline">
          Discover Your Next<br /><span>Favorite Book</span>
        </h2>
        <p className="hero-sub">
          Search millions of titles and save favorites — all in one beautifully designed app.
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => document.querySelector('.search-input')?.focus()}>
            Start Exploring →
          </button>
          <button className="btn-ghost">Browse Trending</button>
        </div>
        <div className="hero-stats">
          <div className="stat-item"><div className="stat-num">20M+</div><div className="stat-label">Books Available</div></div>
          <div className="stat-item"><div className="stat-num">500K+</div><div className="stat-label">Authors</div></div>
          <div className="stat-item"><div className="stat-num">100+</div><div className="stat-label">Languages</div></div>
        </div>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <div key={book.id} className="animate-in">
          <BookCard
            title={book.title}
            author={book.author}
            year={book.year}
            coverId={book.coverId}
            bookId={book.id}
            isFavorite={favorites.includes(book.id)}
            onToggleFavorite={onToggleFavorite}
          />
        </div>
      ))}
    </div>
  );
}