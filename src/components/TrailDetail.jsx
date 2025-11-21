import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { useState } from 'react';
import { FaStar, FaHeart, FaRegHeart, FaMapMarkerAlt, FaClock, FaMountain, FaArrowLeft, FaChartLine } from 'react-icons/fa';
import './TrailDetail.css';

function TrailDetail({ trails, favorites, toggleFavorite, addReview }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const trail = trails.find(t => t.id === parseInt(id));
  
  const [reviewForm, setReviewForm] = useState({
    author: '',
    rating: 5,
    comment: ''
  });
  
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!trail) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <h2>Trail not found</h2>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </Container>
    );
  }

  const isFavorite = favorites.includes(trail.id);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (reviewForm.author && reviewForm.comment) {
      addReview(trail.id, reviewForm);
      setReviewForm({ author: '', rating: 5, comment: '' });
      setShowReviewForm(false);
    }
  };

  return (
    <div className="trail-detail-page">
      <Container>
        {/* 返回按钮 */}
        <Button 
          variant="light" 
          className="back-button"
          onClick={() => navigate('/')}
        >
          <FaArrowLeft /> Back to Trails
        </Button>

        {/* 主图片 */}
        <div className="trail-hero">
          <img src={trail.image} alt={trail.name} className="hero-image" />
          <div className="hero-overlay">
            <Badge bg="dark" className="difficulty-badge-large">
              {trail.difficulty}
            </Badge>
            <Button 
              variant="light"
              className="favorite-button-large"
              onClick={() => toggleFavorite(trail.id)}
            >
              {isFavorite ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
            </Button>
          </div>
        </div>

        {/* 标题区域 */}
        <Row className="trail-header">
          <Col>
            <h1 className="trail-name">{trail.name}</h1>
            <div className="trail-location">
              <FaMapMarkerAlt /> {trail.location}
            </div>
            <div className="trail-rating">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.floor(trail.rating) ? 'star-filled' : 'star-empty'}
                />
              ))}
              <span className="rating-number">{trail.rating}</span>
              <span className="rating-count">({trail.reviews.length} reviews)</span>
            </div>
          </Col>
        </Row>

        {/* 统计信息卡片 */}
        <Row className="stats-row">
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaMountain />
                </div>
                <div className="stat-label">Distance</div>
                <div className="stat-value">{trail.distance}</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaClock />
                </div>
                <div className="stat-label">Duration</div>
                <div className="stat-value">{trail.duration}</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaChartLine />
                </div>
                <div className="stat-label">Elevation</div>
                <div className="stat-value">{trail.elevation}</div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={3}>
            <Card className="stat-card">
              <Card.Body>
                <div className="stat-icon">
                  <FaStar />
                </div>
                <div className="stat-label">Rating</div>
                <div className="stat-value">{trail.rating}/5</div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 描述 */}
        <Row>
          <Col>
            <Card className="description-card">
              <Card.Body>
                <h2>About This Trail</h2>
                <p className="trail-description">{trail.description}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 特性 */}
        <Row>
          <Col>
            <Card className="features-card">
              <Card.Body>
                <h2>Trail Features</h2>
                <div className="features-list">
                  {trail.features.map((feature, index) => (
                    <Badge key={index} bg="success" className="feature-badge-large">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* 评论区 */}
        <Row>
          <Col>
            <Card className="reviews-card">
              <Card.Body>
                <div className="reviews-header">
                  <h2>Reviews ({trail.reviews.length})</h2>
                  <Button 
                    variant="primary"
                    onClick={() => setShowReviewForm(!showReviewForm)}
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </Button>
                </div>

                {/* 评论表单 */}
                {showReviewForm && (
                  <Form onSubmit={handleSubmitReview} className="review-form">
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={reviewForm.author}
                        onChange={(e) => setReviewForm({...reviewForm, author: e.target.value})}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({...reviewForm, rating: parseInt(e.target.value)})}
                      >
                        <option value="5">5 - Excellent</option>
                        <option value="4">4 - Very Good</option>
                        <option value="3">3 - Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="1">1 - Poor</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Your Review</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Share your experience..."
                        value={reviewForm.comment}
                        onChange={(e) => setReviewForm({...reviewForm, comment: e.target.value})}
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                      Submit Review
                    </Button>
                  </Form>
                )}

                {/* 评论列表 */}
                <div className="reviews-list">
                  {trail.reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to review this trail!</p>
                  ) : (
                    trail.reviews.map(review => (
                      <div key={review.id} className="review-item">
                        <div className="review-header">
                          <strong>{review.author}</strong>
                          <span className="review-date">{review.date}</span>
                        </div>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i} 
                              className={i < review.rating ? 'star-filled-small' : 'star-empty-small'}
                            />
                          ))}
                        </div>
                        <p className="review-comment">{review.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TrailDetail;
