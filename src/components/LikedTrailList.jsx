import { Row, Col, Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TrailCardWide from "./TrailCardWide";
import StatsPanel from "./StatsPanel";
import PageWrapper from "./PageWrapper";

function LikedTrailList({ trails }) {
  const [username, setUsername] = useState("");
  const [likedTrailIds, setLikedTrailIds] = useState([]);

  useEffect(() => {
    fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const userInfo = Object.values(json.results)[0];
        setUsername(userInfo.username);
        setLikedTrailIds(userInfo.likedTrails);
      });
  }, []);

  const likedTrails = trails.filter((trail) =>
    likedTrailIds.includes(trail.id.toString())
  );

  const handleUnlike = (trailId) => {
    fetch("https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo", {
      method: "GET",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        const newUserInfo = Object.values(json.results)[0];

        newUserInfo.likedTrails = newUserInfo.likedTrails.filter(
          (id) => id !== trailId
        );

        return fetch(
          `https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo?id=${Object.keys(
            json.results
          )[0]}`,
          {
            method: "PUT",
            headers: {
              "X-CS571-ID": CS571.getBadgerId(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserInfo),
          }
        );
      })
      .then(() => {
        setLikedTrailIds((old) => old.filter((id) => id !== trailId));
      });
  };

  const displayName =
    username && username !== "Anonymous" ? username : "Your";

  const pageTitle =
    displayName === "Your"
      ? "Your Liked Trails"
      : `${displayName}'s Liked Trails`;

  return (
    <PageWrapper>
      <h1 className="text-center mb-4">{pageTitle}</h1>

      {likedTrails.length === 0 ? (
        <Row className="align-items-start">
          <Col md={8} className="mb-4">
            <Card className="text-center shadow-sm">
              <Card.Body>
                <Card.Title className="mb-2">
                  No liked trails yet
                </Card.Title>
                <Card.Text className="text-muted mb-3">
                  Start exploring hikes on the Home page and <br />
                  tap the heart button on a trail to save it here.
                </Card.Text>
                <Button as={Link} to="/p42/" variant="success">
                  Browse trails
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <StatsPanel trails={trails} likedIds={likedTrailIds} />
          </Col>
        </Row>
      ) : (
        <Row className="align-items-start">
          <Col md={8} className="mb-4">
            {likedTrails.map((trail) => (
              <div key={trail.id} className="mb-3">
                <TrailCardWide
                  trail={trail}
                  onUnlike={() => handleUnlike(trail.id.toString())}
                />
              </div>
            ))}
          </Col>

          <Col md={4} className="mb-4">
            <StatsPanel trails={trails} likedIds={likedTrailIds} />
          </Col>
        </Row>
      )}
    </PageWrapper>
  );
}

export default LikedTrailList;
