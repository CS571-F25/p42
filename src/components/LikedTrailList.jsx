import { Container, Row, Col } from 'react-bootstrap'
import TrailCardWide from './TrailCardWide'
import { useState, useEffect } from 'react'

function LikedTrailList({ trails }) {
  const [username, setUsername] = useState("");
  const [likedTrailIds, setLikedTrailIds] = useState([]);

  useEffect(() => {
      fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
        method: "GET",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        }
      }).then(res => res.json()).then(json => {
        setUsername(Object.values(json.results)[0].username);
        setLikedTrailIds(Object.values(json.results)[0].likedTrails);
      })
    }, [])

  return (
    likedTrailIds.length === 0 ? <p className="text-center">You don't have any liked trails yet!</p> :
    <Container className="py-4">
      <h1 className="text-center mb-4">{username}'s Liked Trails</h1>
      
      <Row>
        {trails.filter((trail) => likedTrailIds.includes(trail.id.toString())).map(trail => (
          <Col key={trail.id} md={12} className="mb-4">
            <TrailCardWide trail={trail} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default LikedTrailList