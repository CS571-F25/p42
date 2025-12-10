import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useState, useEffect, useRef } from 'react'
import PageWrapper from "./PageWrapper";

function Account() {
    const [username, setUsername] = useState("");
    const newUsernameRef = useRef(null);
    
    useEffect(() => {
      fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
        method: "GET",
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        }
      }).then(res => res.json()).then(json => {
        setUsername(Object.values(json.results)[0].username);
      })
    }, [])

    const handleUsernameChange = (e) => {
        e.preventDefault();
        if (newUsernameRef.current.value === "") {
            alert("Your username must have at least one character!");
            return;
        }
        fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
            method: "GET",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json",
            }
        }).then(res => res.json()).then(json => {
            const newUserInfo = Object.values(json.results)[0];
            newUserInfo.username = newUsernameRef.current.value;
            fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo?id=${Object.keys(json.results)[0]}`, {
                method: "PUT",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserInfo)
            })
        })
        setUsername(newUsernameRef.current.value);
    }

    const handleAccountReset = () => {
        let confirmation = confirm("WARNING: Resetting your account will reset your username and remove all liked trails. Continue?");

        if (confirmation) {
            fetch('https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo', {
                method: "GET",
                headers: {
                    "X-CS571-ID": CS571.getBadgerId(),
                    "Content-Type": "application/json",
                }
            }).then(res => res.json()).then(json => {
                fetch(`https://cs571api.cs.wisc.edu/rest/f25/bucket/userinfo?id=${Object.keys(json.results)[0]}`, {
                    method: "PUT",
                    headers: {
                        "X-CS571-ID": CS571.getBadgerId(),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: "Anonymous",
                        likedTrails: []
                    })
                })
            })
            setUsername("Anonymous");
        }
    }
  
    return (
    <PageWrapper>
      <h1 className="text-center mb-4">Account</h1>
      
      <Row className="justify-content-center">
        <Col lg={8} className="d-flex justify-content-center">
          <Card className="shadow">
            <Card.Body className="p-4">
              <h2>Username: {username}</h2>
              <Form onSubmit={handleUsernameChange}>
                <Form.Group>
                  <Form.Label htmlFor="newUsername">New Username:</Form.Label>
                  <Form.Control id="newUsername" type="text" ref={newUsernameRef} />
                </Form.Group>
                <Button type="submit">Change Username</Button>
              </Form>
              <br />
              <Button variant="danger" onClick={handleAccountReset}>Reset Account</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageWrapper>
  )
}

export default Account