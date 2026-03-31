// How many books to show per page
export const PAGE_SIZE = 20;

// Returns the cover image URL or null if no cover
export function getCoverUrl(coverId) {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
}

// Filter books whose title or author includes the search text
export function filterByQuery(books, query) {
  if (!query.trim()) return books;
  const search = query.toLowerCase();
  return books.filter(
    (book) =>
      book.title.toLowerCase().includes(search) ||
      book.author.toLowerCase().includes(search)
  );
}

// Filter books that were first published in a given decade (e.g. "1990s")
export function filterByDecade(books, decade) {
  if (decade === 'all') return books;
  const start = parseInt(decade);
  const end = start + 9;
  return books.filter((book) => book.year >= start && book.year <= end);
}

// Sort books by title or year
export function sortBooks(books, option) {
  const list = [...books]; // don't mutate the original
  if (option === 'title-asc') return list.sort((a, b) => a.title.localeCompare(b.title));
  if (option === 'title-desc') return list.sort((a, b) => b.title.localeCompare(a.title));
  if (option === 'year-asc') return list.sort((a, b) => (a.year || 0) - (b.year || 0));
  if (option === 'year-desc') return list.sort((a, b) => (b.year || 0) - (a.year || 0));
  return list;
}

// Return just the books for the current page
export function getPage(books, page) {
  const start = (page - 1) * PAGE_SIZE;
  return books.slice(start, start + PAGE_SIZE);
}