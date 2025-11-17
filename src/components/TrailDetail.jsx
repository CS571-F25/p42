import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap'
import { FaStar, FaArrowLeft } from 'react-icons/fa'

function TrailDetail({ trails }) {
  const { id } = useParams()
  const trail = trails.find(t => t.id === parseInt(id))

  if (!trail) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Trail not found</Alert>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft className="me-2" />
        Back to All Trails
      </Link>

      <Row>
        <Col lg={8}>
          <img 
            src={trail.image} 
            alt={trail.name}
            className="w-100 rounded mb-3"
            style={{ maxHeight: '400px', objectFit: 'cover' }}
          />
          
          <h1>{trail.name}</h1>
          <p className="text-muted mb-2">📍 {trail.location}</p>

          <div className="mb-3">
            <Badge bg="secondary" className="me-2 px-3 py-2">
              {trail.difficulty}
            </Badge>
            <Badge bg="info" className="px-3 py-2">
              {trail.distance}
            </Badge>
          </div>

          <Card className="mb-4">
            <Card.Body>
              <h5>About This Trail</h5>
              <p>{trail.description}</p>
              
              <h6 className="mt-3">Features</h6>
              <div>
                {trail.features.map((feature, index) => (
                  <Badge key={index} bg="success" className="me-2 mb-2">
                    {feature}
                  </Badge>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <h5>Trail Information</h5>
              <hr />
              <div className="mb-3">
                <strong>Overall Rating</strong>
                <div className="d-flex align-items-center mt-1">
                  <FaStar className="text-warning" />
                  <span className="ms-2 fs-4 fw-bold">{trail.rating}</span>
                </div>
              </div>
              <hr />
              <div className="mb-2">
                <strong>Difficulty:</strong> {trail.difficulty}
              </div>
              <div className="mb-2">
                <strong>Distance:</strong> {trail.distance}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TrailDetail