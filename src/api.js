const BASE_URL = 'https://openlibrary.org/search.json';

/**
 * Fetch books from the Open Library Search API.
 * @param {string} query - The search query string.
 * @returns {Promise<Array<{id: string, title: string, author: string, year: number|null, coverId: number|null}>>}
 */
export async function fetchBooks(query) {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&limit=20`
  );

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data = await response.json();

  return (data.docs || []).map((doc) => ({
    id: doc.key || `unknown-${Math.random()}`,
    title: doc.title || 'Untitled',
    author: doc.author_name ? doc.author_name[0] : 'Unknown Author',
    year: doc.first_publish_year || null,
    coverId: doc.cover_i || null,
  }));
}
