
import BookCard from './BookCard';

export default function BookGrid({
  books,
  loading,
  error,
  hasSearched,
  query,
  showFavoritesOnly,
  readBooks,
  favorites,
  onToggleRead,
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

  // Favorites tab empty
  if (showFavoritesOnly && books.length === 0) {
    return (
      <div className="book-grid-status empty">
        <span className="status-icon">💛</span>
        <p>No favorites yet. Heart a book to save it here.</p>
      </div>
    );
  }

  // Search returned nothing
  if (hasSearched && books.length === 0) {
    return (
      <div className="book-grid-status empty">
        <span className="status-icon">📭</span>
        <p>No books found for &lsquo;{query}&rsquo;. Try a different search.</p>
      </div>
    );
  }

  // No search yet — hero welcome
  if (!hasSearched) {
    return (
      <div className="book-grid-status welcome">
        <div className="hero-welcome">
          <span className="hero-emoji">📚</span>
          <h2 className="hero-title">Search for any book ever written</h2>
          <p className="hero-subtitle">
            Explore millions of titles from the Open Library. Search by title, author, or topic.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          year={book.year}
          coverId={book.coverId}
          bookId={book.id}
          isRead={readBooks.includes(book.id)}
          isFavorite={favorites.includes(book.id)}
          onToggleRead={onToggleRead}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
