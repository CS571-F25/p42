import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart, FaClock, FaMountain, FaMapMarkerAlt } from 'react-icons/fa';
import './TrailCard.css';

function TrailCard({ trail, isFavorite, toggleFavorite, isMobile }) {
  return (
    <Card className={`trail-card ${isMobile ? 'mobile' : ''}`}>
      <div className="card-image-container">
        <Card.Img 
          variant="top" 
          src={trail.image} 
          className="card-image"
        />
        <div className="image-overlay">
          <Badge bg="dark" className="difficulty-badge">
            {trail.difficulty}
          </Badge>
        </div>
        <Button 
          variant="link" 
          className="favorite-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(trail.id);
          }}
        >
          {isFavorite ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
        </Button>
      </div>

      <Card.Body>
        <Card.Title className="trail-title">{trail.name}</Card.Title>
        
        <div className="trail-location">
          <FaMapMarkerAlt />
          <span>{trail.location.split(',')[0]}</span>
        </div>

        <div className="trail-stats">
          <div className="stat-item">
            <FaStar className="star-icon" />
            <span className="stat-value">{trail.rating}</span>
          </div>
          <div className="stat-item">
            <FaMountain />
            <span className="stat-value">{trail.distance}</span>
          </div>
          <div className="stat-item">
            <FaClock />
            <span className="stat-value">{trail.duration}</span>
          </div>
        </div>

        <Card.Text className="trail-description">
          {trail.description.substring(0, 100)}...
        </Card.Text>

        <div className="trail-features">
          {trail.features.slice(0, 3).map((feature, index) => (
            <Badge key={index} bg="success" className="feature-badge">
              {feature}
            </Badge>
          ))}
        </div>

        <Link to={`/trail/${trail.id}`} className="btn btn-primary w-100 view-btn">
          View Details →
        </Link>
      </Card.Body>
    </Card>
  );
}

export default TrailCard;
