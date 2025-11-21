import { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import TrailCard from './TrailCard';
import './TrailList.css';

function TrailList({ trails, favorites, toggleFavorite, isMobile }) {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterRating, setFilterRating] = useState(0);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('rating');
  
 
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const filteredTrails = trails.filter(trail => {
    if (filterDifficulty !== 'all' && trail.difficulty !== filterDifficulty) {
      return false;
    }
    if (trail.rating < filterRating) {
      return false;
    }
    if (showFavoritesOnly && !favorites.includes(trail.id)) {
      return false;
    }
    return true;
  });

 
  const sortedTrails = [...filteredTrails].sort((a, b) => {
    switch(sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'distance':
        return parseFloat(a.distance) - parseFloat(b.distance);
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });


  useEffect(() => {
    setCurrentIndex(0);
  }, [filterDifficulty, filterRating, showFavoritesOnly, sortBy]);


  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
     
      handleNext();
    }
    if (touchEndX.current - touchStartX.current > 50) {
      
      handlePrev();
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(sortedTrails.length - 1, prev + 1));
  };

  return (
    <Container className={`trail-list-container ${isMobile ? 'mobile' : ''}`}>
      <div className="page-header">
        <h1>🥾 Discover Madison Hiking Trails</h1>
        <p>Explore the best trails in Madison area</p>
      </div>
      
    
      <div className="filter-section">
        <Row className="g-3">
          <Col xs={6} md={3}>
            <Form.Group>
              <Form.Label>Difficulty</Form.Label>
              <Form.Select 
                value={filterDifficulty} 
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col xs={6} md={3}>
            <Form.Group>
              <Form.Label>Min Rating</Form.Label>
              <Form.Select 
                value={filterRating} 
                onChange={(e) => setFilterRating(Number(e.target.value))}
              >
                <option value="0">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={6} md={3}>
            <Form.Group>
              <Form.Label>Sort By</Form.Label>
              <Form.Select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Shortest Distance</option>
                <option value="name">Name (A-Z)</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col xs={6} md={3} className="d-flex align-items-end">
            <Form.Check 
              type="checkbox"
              label="❤️ Favorites Only"
              checked={showFavoritesOnly}
              onChange={(e) => setShowFavoritesOnly(e.target.checked)}
              className="favorites-filter"
            />
          </Col>
        </Row>

        <div className="results-info">
          <span className="count-badge">{sortedTrails.length} trail{sortedTrails.length !== 1 ? 's' : ''} found</span>
          {showFavoritesOnly && <span className="filter-tag">Favorites</span>}
          {filterDifficulty !== 'all' && <span className="filter-tag">{filterDifficulty}</span>}
        </div>
      </div>


      {isMobile && sortedTrails.length > 0 ? (
        <div className="mobile-carousel">
          <div 
            className="carousel-track"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <TrailCard 
              trail={sortedTrails[currentIndex]} 
              isFavorite={favorites.includes(sortedTrails[currentIndex].id)}
              toggleFavorite={toggleFavorite}
              isMobile={true}
            />
          </div>

       
          <div className="carousel-controls">
            <Button 
              variant="light" 
              className="carousel-btn prev"
              onClick={handlePrev}
              disabled={currentIndex === 0}
            >
              <FaChevronLeft />
            </Button>

            <div className="carousel-indicator">
              <span className="current">{currentIndex + 1}</span>
              <span className="separator">/</span>
              <span className="total">{sortedTrails.length}</span>
            </div>

            <Button 
              variant="light" 
              className="carousel-btn next"
              onClick={handleNext}
              disabled={currentIndex === sortedTrails.length - 1}
            >
              <FaChevronRight />
            </Button>
          </div>

      
          <div className="carousel-dots">
            {sortedTrails.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : 
     
      !isMobile ? (
        <Row>
          {sortedTrails.length > 0 ? (
            sortedTrails.map(trail => (
              <Col key={trail.id} md={6} lg={4} className="mb-4">
                <TrailCard 
                  trail={trail} 
                  isFavorite={favorites.includes(trail.id)}
                  toggleFavorite={toggleFavorite}
                  isMobile={false}
                />
              </Col>
            ))
          ) : (
            <Col>
              <div className="no-results">
                <h4>😔 No trails found</h4>
                <p>Try adjusting your filters</p>
              </div>
            </Col>
          )}
        </Row>
      ) : (
        <div className="no-results">
          <h4>😔 No trails found</h4>
          <p>Try adjusting your filters</p>
        </div>
      )}
    </Container>
  );
}

export default TrailList;
