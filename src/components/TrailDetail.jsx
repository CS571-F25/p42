import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Card, Badge, Alert, Button } from 'react-bootstrap'
import { FaArrowLeft } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import TrailFeatureChips from './TrailFeatureChips'

function TrailDetail({ trails }) {
  const { id } = useParams()
  const trail = trails.find(t => t.id === parseInt(id))
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      }
    }).then(res => res.json()).then(json => {
      setIsLiked(Object.values(json.results)[0].likedTrails.includes(id));
    })
  }, [id])

  const handleLike = (e) => {
    e.preventDefault();
    fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(json => {
      const newUserInfo = Object.values(json.results)[0];
      if (isLiked) {
        newUserInfo.likedTrails = newUserInfo.likedTrails.filter(i => i !== id);
      } else {
        newUserInfo.likedTrails.push(id);
      }
      fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo?id=${Object.keys(json.results)[0]}`, {
        method: "PUT",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserInfo)
      })
    })
    setIsLiked(old => !old);
  }

  if (!trail) {
    return (
      <Container className="py-4">
        <Alert variant="danger">Trail not found</Alert>
        <Link to="/p42/" className="btn btn-primary">Back to Home</Link>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Link to="/p42/" className="btn btn-outline-secondary mb-3">
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
              <TrailFeatureChips features={trail.features} />
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <h5>Trail Information</h5>
              <hr />
              <div className="mb-2">
                <strong>Difficulty:</strong> {trail.difficulty}
              </div>
              <div className="mb-2">
                <strong>Distance:</strong> {trail.distance}
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Button onClick={handleLike}>
                ❤️ {isLiked ? "Unlike" : "Like"} this trail
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default TrailDetail