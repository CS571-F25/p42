import { Container } from "react-bootstrap";

function PageWrapper({ children }) {
  return (
    <Container className="py-4">
      <div style={{ maxWidth: "900px", margin: "0 auto", width: "80vw" }}>
        {children}
      </div>
    </Container>
  );
}

export default PageWrapper;
