import { Container, Row, Col, Card } from 'react-bootstrap'

function About() {
  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">About Madison Hiking Guide</h1>
      
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <h3>Our Mission</h3>
              <p>
                Madison Hiking Guide helps students and residents discover the 
                best hiking trails in the Madison area. Whether you're looking 
                for an easy lakeside walk or a challenging forest hike, we've 
                got you covered.
              </p>

              <h3 className="mt-4">Features</h3>
              <ul>
                <li>Browse detailed information about local trails</li>
                <li>Filter trails by difficulty and length</li>
                <li>Save your favorite trails</li>
                <li>Read and write reviews</li>
                <li>View trail locations and features</li>
              </ul>

              <h3 className="mt-4">Team</h3>
              <p>
                This project was created by Macy Xiang, Ben Vanorny, and Ryan Li 
                as part of the CS571 Web Development course at UW-Madison.
              </p>

              <h3 className="mt-4">Technologies Used</h3>
              <ul>
                <li>React 18</li>
                <li>React Router</li>
                <li>React Bootstrap</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default About