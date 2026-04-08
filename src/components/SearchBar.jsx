import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const timerRef = useRef(null);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (input.trim()) {
      timerRef.current = setTimeout(() => {
        onSearch(input.trim());
      }, 300);
    }
    return () => clearTimeout(timerRef.current);
  }, [input, onSearch]);

  function handleSubmit(e) {
    e.preventDefault();
    clearTimeout(timerRef.current);
    if (input.trim()) {
      onSearch(input.trim());
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="search-bar-inner">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search 20 million books by title, author, or topic…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          aria-label="Search books"
        />
        <button type="submit" className="search-button btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}