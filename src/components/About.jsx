import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaHiking, FaHeart, FaSearch, FaMobileAlt, FaGithub } from 'react-icons/fa';
import './About.css';

function About() {
  return (
    <Container className="about-container">
      <div className="about-header">
        <FaHiking className="about-icon" />
        <h1>About Madison Hiking Guide</h1>
        <p className="subtitle">Your Ultimate Trail Companion</p>
      </div>

      <Row className="justify-content-center mb-5">
        <Col lg={10}>
          <Card className="mission-card">
            <Card.Body>
              <h2>🌲 Our Mission</h2>
              <p>
                Madison Hiking Guide helps students and residents discover the best hiking trails 
                in the Madison area. Whether you're looking for an easy lakeside walk or a 
                challenging mountain hike, we've got you covered.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="features-section mb-5">
        <Col md={6} lg={3} className="mb-4">
          <Card className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <Card.Body>
              <h3>Smart Search</h3>
              <p>Quickly find trails by name, location, or difficulty level</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="feature-card">
            <div className="feature-icon">
              <FaHeart />
            </div>
            <Card.Body>
              <h3>Save Favorites</h3>
              <p>Bookmark your favorite trails for quick access anytime</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="feature-card">
            <div className="feature-icon">
              <FaMobileAlt />
            </div>
            <Card.Body>
              <h3>Mobile Optimized</h3>
              <p>Swipe through trails one at a time on your phone</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={3} className="mb-4">
          <Card className="feature-card">
            <div className="feature-icon">
              <FaHiking />
            </div>
            <Card.Body>
              <h3>Detailed Info</h3>
              <p>Get comprehensive trail details, ratings, and reviews</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center mb-5">
        <Col lg={10}>
          <Card className="team-card">
            <Card.Body>
              <h2>👥 Our Team</h2>
              <p>
                This project was created by <strong>Macy Xiang</strong>, <strong>Ben Vanorny</strong>, 
                and <strong>Ryan Li</strong> as part of the <strong>CS571 Web Development</strong> course 
                at UW-Madison.
              </p>
              <div className="team-links">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub /> View on GitHub
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col lg={10}>
          <Card className="tech-card">
            <Card.Body>
              <h2>🛠️ Technologies Used</h2>
              <div className="tech-stack">
                <span className="tech-badge">React 18</span>
                <span className="tech-badge">React Router</span>
                <span className="tech-badge">React Bootstrap</span>
                <span className="tech-badge">React Icons</span>
                <span className="tech-badge">CSS3</span>
                <span className="tech-badge">Responsive Design</span>
                <span className="tech-badge">Touch Gestures</span>
                <span className="tech-badge">LocalStorage</span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="about-footer">
        <p>Made with ❤️ for the Madison community</p>
        <p className="copyright">© 2024 Madison Hiking Guide. All rights reserved.</p>
      </div>
    </Container>
  );
}

export default About;
