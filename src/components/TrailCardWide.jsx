import { Card, Badge, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function TrailCardWide({ trail }) {
  return (
    <Card className="w-100 shadow-sm">
      <Row>
        <Col className="align-self-center">
          <Card.Img 
            variant="top" 
            src={trail.image} 
            style={{ height: '100px', objectFit: 'cover' }}
          />
        </Col>
        <Col className="align-self-center py-2">
          <Card.Title>{trail.name}</Card.Title>
        
          <div className="mb-2">
            <Badge bg="secondary" className="me-2">{trail.difficulty}</Badge>
            <Badge bg="info">{trail.distance}</Badge>
          </div>
          
          <Card.Text className="text-muted small mb-3 flex-grow-1">
            {trail.description.substring(0, 100)}...
          </Card.Text>
        </Col>
        <Col className="align-self-center">
          <Link to={`/p42/likedtrail/${trail.id}`} className="btn btn-success w-100">
            View Details
          </Link>
        </Col>
      </Row>
    </Card>
  )
}

export default TrailCardWide