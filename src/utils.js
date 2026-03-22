/**
 * Open Library Book Finder — Utility Functions
 * All functions are pure and use Array HOFs only (no for/while loops).
 */

export const PAGE_SIZE = 20;

/**
 * Paginate an array of books using .slice().
 * @param {Array} books
 * @param {number} page - 1-indexed page number
 * @param {number} pageSize
 * @returns {Array}
 */
export function paginateBooks(books, page, pageSize = PAGE_SIZE) {
  const start = (page - 1) * pageSize;
  return books.slice(start, start + pageSize);
}


/**
 * Get the cover image URL for a given cover ID.
 * @param {number|null} coverId
 * @param {'S'|'M'|'L'} size
 * @returns {string|null}
 */
export function getCoverUrl(coverId, size = 'M') {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

/**
 * Filter books by title or author matching the query (case-insensitive).
 * Uses .filter() — no for/while loops.
 * @param {Array} books
 * @param {string} query
 * @returns {Array}
 */
export function filterByQuery(books, query) {
  if (!query || !query.trim()) return books;
  const lower = query.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(lower) ||
      book.author.toLowerCase().includes(lower)
  );
}

/**
 * Filter books by decade.
 * Uses .filter() — no for/while loops.
 * @param {Array} books
 * @param {string} decade - e.g. "1990s", "2000s", "2010s", "2020s", or "all"
 * @returns {Array}
 */
export function filterByDecade(books, decade) {
  if (!decade || decade === 'all') return books;
  const decadeStart = parseInt(decade, 10);
  const decadeEnd = decadeStart + 9;
  return books.filter(
    (book) => book.year && book.year >= decadeStart && book.year <= decadeEnd
  );
}

/**
 * Sort books by the given option.
 * Uses .sort() on a shallow copy — no for/while loops.
 * @param {Array} books
 * @param {string} sortOption - "year-desc", "year-asc", "title-asc", "title-desc"
 * @returns {Array}
 */
export function sortBooks(books, sortOption) {
  const sorted = [...books];
  switch (sortOption) {
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return sorted.sort((a, b) => b.title.localeCompare(a.title));
    case 'year-asc':
      return sorted.sort((a, b) => (a.year || 0) - (b.year || 0));
    case 'year-desc':
      return sorted.sort((a, b) => (b.year || 0) - (a.year || 0));
    default:
      return sorted;
  }
}
