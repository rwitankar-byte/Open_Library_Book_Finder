// Fetches books from Open Library based on a search term
export async function fetchBooks(searchTerm) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchTerm)}&limit=20`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  const data = await response.json();

  // Turn each result into a simple object we actually need
  return data.docs.map((book) => ({
    id: book.key,
    title: book.title || 'No Title',
    author: book.author_name?.[0] || 'Unknown Author',
    year: book.first_publish_year || null,
    coverId: book.cover_i || null,
  }));
}