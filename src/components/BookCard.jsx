import { getCoverUrl } from '../utils';

export default function BookCard({ title, author, year, coverId, bookId, isFavorite, onToggleFavorite }) {
  const coverUrl = getCoverUrl(coverId);

  return (
    <div className="book-card">
      <div className="book-card-cover-wrapper">
        <div className="book-card-cover">
          {coverUrl ? (
            <img src={coverUrl} alt={`Cover of ${title}`} loading="lazy" />
          ) : (
            <div className="book-card-placeholder">
              <span className="placeholder-icon">📖</span>
              <span className="placeholder-text">No Cover</span>
            </div>
          )}
          <div className="book-card-cover-overlay"></div>
          {isFavorite && (
            <div className="book-card-badge">
              ♥ Saved
            </div>
          )}
        </div>
      </div>

      <div className="book-card-info">
        <h3 className="book-card-title" title={title}>{title}</h3>
        <p className="book-card-author">{author}</p>
        <span className="book-card-year">{year || 'Year unknown'}</span>
      </div>

      <div className="book-card-actions">
        <button
          className={`book-card-btn fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(bookId)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}