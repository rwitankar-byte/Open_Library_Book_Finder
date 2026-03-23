

export default function Navbar({
  darkMode,
  toggleDarkMode,
  readCount,
  showFavoritesOnly,
  toggleShowFavorites,
}) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">📚</span>
        <h1 className="navbar-title">Open Library Book Finder</h1>
      </div>
      <div className="navbar-right">
        <button
          className={`navbar-tab ${!showFavoritesOnly ? 'active' : ''}`}
          onClick={() => showFavoritesOnly && toggleShowFavorites()}
        >
          All Books
        </button>
        <button
          className={`navbar-tab ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => !showFavoritesOnly && toggleShowFavorites()}
        >
          ♥ Favorites
        </button>
        <span className="navbar-read-count">
          Books Read: <strong>{readCount}</strong>
        </span>
        <button
          className="navbar-dark-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
