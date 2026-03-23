import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const debounceRef = useRef(null);

  // Debounce: fire onSearch 300ms after user stops typing
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const trimmed = input.trim();
    if (trimmed) {
      debounceRef.current = setTimeout(() => {
        onSearch(trimmed);
      }, 300);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [input, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Immediate search on Enter
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    const trimmed = input.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-inner">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for books…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Search books"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </div>
    </form>
  );
}
