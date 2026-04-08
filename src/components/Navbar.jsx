export default function Navbar({ darkMode, toggleDarkMode, showFavoritesOnly, toggleShowFavorites }) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-logo">📚</span>
        <h1 className="navbar-title">Book Finder</h1>
      </div>

      <div className="navbar-center">
        <button className={`navbar-link ${!showFavoritesOnly ? 'active' : ''}`} onClick={() => showFavoritesOnly && toggleShowFavorites()}>Discover</button>
        <button className={`navbar-link ${showFavoritesOnly ? 'active' : ''}`} onClick={() => !showFavoritesOnly && toggleShowFavorites()}>Favorites</button>
      </div>

      <div className="navbar-right">
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