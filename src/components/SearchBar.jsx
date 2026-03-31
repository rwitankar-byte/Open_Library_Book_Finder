import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  const timerRef = useRef(null);

  // Auto-search 300ms after the user stops typing
  useEffect(() => {
    clearTimeout(timerRef.current);

    if (input.trim()) {
      timerRef.current = setTimeout(() => {
        onSearch(input.trim());
      }, 300);
    }

    // Cleanup: clear the timer if input changes before 300ms
    return () => clearTimeout(timerRef.current);
  }, [input, onSearch]);

  // Immediate search when user presses Enter or clicks Search
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