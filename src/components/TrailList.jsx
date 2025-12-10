import { useState } from "react";
import { Container, Row, Col, Alert } from 'react-bootstrap';
import TrailCard from './TrailCard';
import FilterBar from './FilterBar';

function TrailList({ trails }) {
  const [difficulty, setDifficulty] = useState("");
  const [maxDistance, setMaxDistance] = useState("");

  const resetFilters = () => {
    setDifficulty("");
    setMaxDistance("");
  };

  const filtered = trails.filter(trail => {
    let ok = true;
    if (difficulty && trail.difficulty !== difficulty) ok = false;
    if (maxDistance) {
      const distNum = parseFloat(trail.distance); // e.g. "2 mi"
      if (!isNaN(distNum) && distNum > parseFloat(maxDistance)) ok = false;
    }
    return ok;
  });

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Madison Hiking Trails</h1>

      <FilterBar
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        onReset={resetFilters}
      />

      {(!trails || trails.length === 0) && (
        <Alert variant="info" className="mt-3 text-center">
          Loading trails... If this message doesn&apos;t go away, please refresh the page.
        </Alert>
      )}

      {trails.length > 0 && filtered.length === 0 && (
        <Alert variant="warning" className="mt-3 text-center">
          No trails match your current filters. Try adjusting the difficulty or max distance,
          or click&nbsp;
          <strong>Reset Filters</strong> above.
        </Alert>
      )}

      {filtered.length > 0 && (
        <>
          <Row>
            {filtered.map(trail => (
              <Col key={trail.id} md={6} lg={4} className="mb-4">
                <TrailCard trail={trail} />
              </Col>
            ))}
          </Row>
          <p className="text-center text-muted mt-2">
            You&apos;ve reached the end of the trails. Happy hiking! 🌲
          </p>
        </>
      )}
    </Container>
  );
}

export default TrailList;
