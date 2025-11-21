import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';
import './SearchBar.css';

function SearchBar({ searchQuery, setSearchQuery, onMenuClick, showMenu }) {
  return (
    <div className="search-bar-container">
      <div className="search-bar">
   
        {showMenu && (
          <button className="menu-button" onClick={onMenuClick}>
            <FaBars />
          </button>
        )}

      
        <div className="search-input-wrapper">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search trails by name, location, or difficulty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />

          {searchQuery && (
            <button className="clear-button" onClick={() => setSearchQuery('')}>
              <FaTimes />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;