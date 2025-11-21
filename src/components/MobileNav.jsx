import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHeart, FaInfoCircle, FaList } from 'react-icons/fa';
import './MobileNav.css';

function MobileNav({ trails, favorites }) {
  const location = useLocation();
  const [showTrailList, setShowTrailList] = useState(false);

  const favoriteTrails = trails.filter(trail => favorites.includes(trail.id));

  return (
    <>
   
      {showTrailList && (
        <>
          <div className="drawer-overlay" onClick={() => setShowTrailList(false)}></div>
          <div className="trail-drawer">
            <div className="drawer-header">
              <h3>Trail Directory</h3>
              <button onClick={() => setShowTrailList(false)}>✕</button>
            </div>
            <div className="drawer-content">
              {trails.map(trail => (
                <Link 
                  key={trail.id}
                  to={`/trail/${trail.id}`}
                  className="drawer-trail-item"
                  onClick={() => setShowTrailList(false)}
                >
                  <img src={trail.image} alt={trail.name} />
                  <div className="drawer-trail-info">
                    <h4>{trail.name}</h4>
                    <p>{trail.difficulty} • {trail.distance}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

   
      <nav className="mobile-nav">
        <Link 
          to="/" 
          className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <button 
          className="nav-button"
          onClick={() => setShowTrailList(true)}
        >
          <FaList />
          <span>Trails</span>
          {trails.length > 0 && <span className="badge">{trails.length}</span>}
        </button>

        <Link 
          to="/" 
          className="nav-button"
          onClick={(e) => {
            e.preventDefault();
            
            if (favorites.length > 0) {
              alert(`You have ${favorites.length} favorite trail(s)!`);
            } else {
              alert('No favorites yet! Tap the heart icon on trails to save them.');
            }
          }}
        >
          <FaHeart />
          <span>Favorites</span>
          {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
        </Link>

        <Link 
          to="/about" 
          className={`nav-button ${location.pathname === '/about' ? 'active' : ''}`}
        >
          <FaInfoCircle />
          <span>About</span>
        </Link>
      </nav>
    </>
  );
}

export default MobileNav;
