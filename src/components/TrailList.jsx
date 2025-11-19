import { Container, Row, Col } from 'react-bootstrap'
import TrailCard from './TrailCard'

function TrailList({ trails }) {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Madison Hiking Trails</h1>
      
      <Row>
        {trails.map(trail => (
          <Col key={trail.id} md={6} lg={4} className="mb-4">
            <TrailCard trail={trail} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TrailList