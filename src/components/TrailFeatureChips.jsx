import { Badge } from "react-bootstrap";

function TrailFeatureChips({ features }) {
  if (!features || features.length === 0) {
    return <p className="text-muted">No specific features listed.</p>;
  }

  return (
    <div aria-label="Trail features">
      {features.map((feature, idx) => (
        <Badge key={idx} bg="success" className="me-2 mb-2">
          {feature}
        </Badge>
      ))}
    </div>
  );
}

export default TrailFeatureChips;