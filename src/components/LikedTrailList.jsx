import { Container, Row, Col } from 'react-bootstrap'
import TrailCardWide from './TrailCardWide'
import StatsPanel from './StatsPanel'
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
      const userInfo = Object.values(json.results)[0];
      setUsername(userInfo.username);
      setLikedTrailIds(userInfo.likedTrails);
    })
  }, [])

  const likedTrails = trails.filter(trail =>
    likedTrailIds.includes(trail.id.toString())
  );

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">{username}'s Liked Trails</h1>

      {likedTrails.length === 0 ? (
        <>
          <p className="text-center">You don't have any liked trails yet!</p>
          <Row className="mt-4">
            <Col md={8}></Col>
            <Col md={4}>
              <StatsPanel trails={trails} likedIds={likedTrailIds} />
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col md={8}>
            <Row>
              {likedTrails.map(trail => (
                <Col key={trail.id} md={12} className="mb-4">
                  <TrailCardWide trail={trail} />
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={4}>
            <StatsPanel trails={trails} likedIds={likedTrailIds} />
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default LikedTrailList
