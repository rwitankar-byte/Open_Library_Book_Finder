export default function Navbar({ darkMode, toggleDarkMode, readCount, showFavoritesOnly, toggleShowFavorites }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">📚</span>
        <h1 className="navbar-title">Open Library Book Finder</h1>
      </div>

      <div className="navbar-right">
        {/* Tab: All Books */}
        <button
          className={`navbar-tab ${!showFavoritesOnly ? 'active' : ''}`}
          onClick={() => showFavoritesOnly && toggleShowFavorites()}
        >
          All Books
        </button>

        {/* Tab: Favorites */}
        <button
          className={`navbar-tab ${showFavoritesOnly ? 'active' : ''}`}
          onClick={() => !showFavoritesOnly && toggleShowFavorites()}
        >
          ♥ Favorites
        </button>

        {/* Books read counter */}
        <span className="navbar-read-count">
          Books Read: <strong>{readCount}</strong>
        </span>

        {/* Dark / light mode toggle */}
        <button
          className="navbar-dark-toggle"
          onClick={toggleDarkMode}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}