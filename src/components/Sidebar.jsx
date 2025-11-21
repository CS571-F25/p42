import { Link, useNavigate } from 'react-router-dom';
import { FaHiking, FaHeart, FaInfoCircle, FaBars, FaTimes, FaStar } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ trails, favorites, isOpen, onToggle }) {
  const navigate = useNavigate();
  const favoriteTrails = trails.filter(trail => favorites.includes(trail.id));

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onToggle}></div>
      )}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <FaHiking className="logo-icon" />
            <h2>Madison Trails</h2>
          </div>
          <button className="sidebar-close" onClick={onToggle}>
            <FaTimes />
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" className="nav-item" onClick={onToggle}>
            <FaHiking />
            <span>All Trails</span>
          </Link>
          <Link to="/about" className="nav-item" onClick={onToggle}>
            <FaInfoCircle />
            <span>About</span>
          </Link>
        </nav>

        {favoriteTrails.length > 0 && (
          <div className="sidebar-section">
            <div className="section-header">
              <FaHeart className="section-icon" />
              <h3>Favorites</h3>
              <span className="count">{favoriteTrails.length}</span>
            </div>
            <ul className="favorites-list">
              {favoriteTrails.map(trail => (
                <li key={trail.id} onClick={() => {
                  navigate(`/trail/${trail.id}`);
                  onToggle();
                }}>
                  <div className="favorite-item">
                    <span className="trail-name">{trail.name}</span>
                    <div className="trail-meta">
                      <FaStar className="star-icon" />
                      <span>{trail.rating}</span>
                      <span className="difficulty">{trail.difficulty}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="sidebar-section">
          <div className="section-header">
            <FaHiking className="section-icon" />
            <h3>All Trails</h3>
            <span className="count">{trails.length}</span>
          </div>
          <ul className="trails-directory">
            {trails.map(trail => (
              <li key={trail.id} onClick={() => {
                navigate(`/trail/${trail.id}`);
                onToggle();
              }}>
                <div className="directory-item">
                  <span className="trail-name">{trail.name}</span>
                  <div className="trail-info">
                    <span className={`difficulty-badge ${trail.difficulty.toLowerCase()}`}>
                      {trail.difficulty}
                    </span>
                    <span className="distance">{trail.distance}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-footer">
          <p>Made with ❤️ for Madison</p>
          <p className="copyright">© 2024 Madison Hiking Guide</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;