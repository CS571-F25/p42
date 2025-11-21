import { Link, useNavigate } from 'react-router-dom';
import { FaHiking, FaHeart, FaInfoCircle, FaTimes, FaStar } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar({ trails, favorites, isOpen, onToggle }) {
  const navigate = useNavigate();
  const favoriteTrails = trails.filter(t => favorites.includes(t.id));

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onToggle}></div>}

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

            <div className="trail-list-wrapper">
              {favoriteTrails.map(trail => (
                <div
                  key={trail.id}
                  className="trail-card-mini"
                  onClick={() => {
                    navigate(`/trail/${trail.id}`);
                    onToggle();
                  }}
                >
                  <div className="trail-card-title">{trail.name}</div>
                  <div className="trail-card-meta">
                    <FaStar className="star-mini" />
                    <span className="meta-rating">{trail.rating}</span>
                    <span className="badge-mini">{trail.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="sidebar-section">
          <div className="section-header">
            <FaHiking className="section-icon" />
            <h3>All Trails</h3>
            <span className="count">{trails.length}</span>
          </div>

          <div className="trail-list-wrapper">
            {trails.map(trail => (
              <div
                key={trail.id}
                className="trail-card-mini"
                onClick={() => {
                  navigate(`/trail/${trail.id}`);
                  onToggle();
                }}
              >
                <div className="trail-card-title">{trail.name}</div>

                <div className="trail-card-meta">
                  <span className="badge-mini">{trail.difficulty}</span>
                  <span className="meta-distance">{trail.distance}</span>
                </div>
              </div>
            ))}
          </div>
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
