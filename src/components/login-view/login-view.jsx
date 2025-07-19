import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Alert, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    if (username.length < 3 || password.length < 5) {
      setError("Username must be at least 3 characters and password at least 5 characters.");
      setIsLoading(false);
      return;
    }

    // TEMPORARY: Mock authentication while server is down
    // Remove this when Heroku backend is fixed
    if (username === "demo" && password === "demo123") {
      setTimeout(() => {
        const mockUser = {
          _id: "mock_user_id",
          Username: "demo",
          Email: "demo@example.com",
          Birthday: "1990-01-01",
          FavoriteMovies: []
        };
        const mockToken = "mock_jwt_token_for_development";
        
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("token", mockToken);
        onLoggedIn(mockUser, mockToken);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const data = {
        Username: username,
        Password: password
      };

      // Try to wake up the Heroku app first
      try {
        await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/", { method: 'GET' });
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        // App wake-up attempt failed, continuing with login...
      }

      const response = await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (response.ok && result.user && result.token) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);
        onLoggedIn(result.user, result.token);
      } else {
        if (response.status === 400) {
          setError("Invalid username or password.");
        } else if (response.status === 401) {
          setError("Unauthorized. Please check your credentials.");
        } else if (response.status === 410) {
          setError("Login service is currently unavailable (410 Gone). The API may be down or moved.");
        } else if (response.status >= 500 || response.status === 503) {
          setError("Backend server is currently down (H10 error). Try demo/demo123 for mock login, or contact admin to restart Heroku app.");
        } else {
          setError(result.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      setError("Backend server crashed (H10 error). Use demo/demo123 for mock login, or restart the Heroku backend app.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6} xl={5}>
          <Card className="shadow">
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-4">
                <h2>Login</h2>
              </Card.Title>
              
              {/* Temporary notice while backend is down */}
              <Alert variant="info" className="mb-3">
                <strong>Backend server is currently down!</strong><br/>
                Use <code>demo</code> / <code>demo123</code> for mock login while the Heroku app is being fixed.
              </Alert>
              
              {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    placeholder="Enter username"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={5}
                    placeholder="Enter password"
                  />
                </Form.Group>

                <div className="d-grid gap-2 mb-3">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Logging in...
                      </>
                    ) : "Login"}
                  </Button>
                </div>

                <div className="text-center">
                  <small className="text-muted">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                  </small>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};