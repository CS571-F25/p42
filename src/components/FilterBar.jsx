import { Form, Row, Col, Button } from "react-bootstrap";

function FilterBar({ difficulty, setDifficulty, maxDistance, setMaxDistance, onReset }) {
  return (
    <Form className="mb-3" aria-label="Trail filters">
      <Row className="gy-2">
        <Col md={4}>
          <Form.Label htmlFor="difficulty-select">Difficulty</Form.Label>
          <Form.Select
            id="difficulty-select"
            value={difficulty}
            onChange={e => setDifficulty(e.target.value)}
          >
            <option value="">All</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Label htmlFor="distance-input">Max distance (miles)</Form.Label>
          <Form.Control
            id="distance-input"
            type="number"
            min="0"
            value={maxDistance}
            onChange={e => setMaxDistance(e.target.value)}
          />
        </Col>
        <Col md={4} className="d-flex align-items-end">
          <Button variant="outline-secondary" onClick={onReset} className="w-100">
            Reset Filters
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default FilterBar;