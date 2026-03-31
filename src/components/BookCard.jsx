import { getCoverUrl } from '../utils';

export default function BookCard({ title, author, year, coverId, bookId, isRead, isFavorite, onMarkAsRead, onToggleFavorite }) {
  const coverUrl = getCoverUrl(coverId);

  return (
    <div className="book-card">
      {/* Cover image or a placeholder */}
      <div className="book-card-cover">
        {coverUrl ? (
          <img src={coverUrl} alt={`Cover of ${title}`} loading="lazy" />
        ) : (
          <div className="book-card-placeholder">
            <span className="placeholder-icon">📖</span>
            <span className="placeholder-text">No Cover</span>
          </div>
        )}
      </div>

      {/* Book info */}
      <div className="book-card-info">
        <h3 className="book-card-title" title={title}>{title}</h3>
        <p className="book-card-author">{author}</p>
        <p className="book-card-year">{year || 'Year unknown'}</p>
      </div>

      {/* Action buttons */}
      <div className="book-card-actions">
        <button
          className={`book-card-btn read-btn ${isRead ? 'active' : ''}`}
          onClick={() => onMarkAsRead(bookId)}
          disabled={isRead}
          title={isRead ? 'Already marked as read' : 'Mark as read'}
        >
          {isRead ? '✓ Read' : "✓ I've Read This"}
        </button>

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