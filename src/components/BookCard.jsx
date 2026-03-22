import React from 'react';
import { getCoverUrl } from '../utils';

export default function BookCard({
  title,
  author,
  year,
  coverId,
  bookId,
  isRead,
  isFavorite,
  onToggleRead,
  onToggleFavorite,
}) {
  const coverUrl = getCoverUrl(coverId);

  return (
    <div className="book-card">
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
      <div className="book-card-info">
        <h3 className="book-card-title" title={title}>
          {title}
        </h3>
        <p className="book-card-author">{author}</p>
        <p className="book-card-year">{year ? year : 'Year unknown'}</p>
      </div>
      <div className="book-card-actions">
        <button
          className={`book-card-btn read-btn ${isRead ? 'active' : ''}`}
          onClick={() => onToggleRead(bookId)}
          disabled={isRead}
          title={isRead ? 'Already read' : "Mark as read"}
          aria-label={isRead ? 'Already read' : "Mark as read"}
        >
          {isRead ? '✓ Read' : '✓ I\'ve Read This'}
        </button>
        <button
          className={`book-card-btn fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(bookId)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>
    </div>
  );
}
