import { Card, ListGroup } from "react-bootstrap";

function StatsPanel({ trails, likedIds }) {
  const total = trails.length;
  const easy = trails.filter(t => t.difficulty === "Easy").length;
  const moderate = trails.filter(t => t.difficulty === "Moderate").length;
  const hard = trails.filter(t => t.difficulty === "Hard").length;

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>Trail Stats</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>Total trails: {total}</ListGroup.Item>
          <ListGroup.Item>Easy: {easy}</ListGroup.Item>
          <ListGroup.Item>Moderate: {moderate}</ListGroup.Item>
          <ListGroup.Item>Hard: {hard}</ListGroup.Item>
          <ListGroup.Item>Liked by you: {likedIds.length}</ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default StatsPanel;
