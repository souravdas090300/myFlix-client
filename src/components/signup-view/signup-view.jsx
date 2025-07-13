import React, { useState } from "react";
import { Form, Button, Alert, Card, Spinner } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export const SignupView = ({ onSignedUp }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthday: ""
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (formData.password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.birthday) {
      newErrors.birthday = "Birthday is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerError("");
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // First, try to wake up the Heroku app by making a simple GET request
      try {
        await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/", { method: 'GET' });
        // Wait a moment for the app to fully wake up
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        // App wake-up attempt failed, continuing with signup...
      }

      const response = await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: formData.username,
          Password: formData.password,
          Email: formData.email,
          Birthday: formData.birthday
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        // Handle different types of errors
        if (response.status === 400) {
          setServerError("Invalid user data. Please check your information.");
        } else if (response.status === 409) {
          setServerError("Username or email already exists. Please try different credentials.");
        } else if (response.status === 410) {
          setServerError(
            <div>
              <strong>Registration service unavailable</strong><br/>
              The API endpoint is currently down (410 Gone). This might be due to:<br/>
              • The Heroku app being asleep or deactivated<br/>
              • API endpoint has been moved<br/>
              <br/>
              <strong>For testing purposes, you can use these demo credentials:</strong><br/>
              Username: <code>testuser</code><br/>
              Password: <code>password123</code>
            </div>
          );
        } else if (response.status === 500) {
          setServerError("Server error. Please try again later.");
        } else if (response.status >= 500) {
          setServerError("Server is experiencing issues. Please try again later.");
        } else {
          setServerError(data.message || `Signup failed (${response.status}). Please try again.`);
        }
        return;
      }

      // Check if response has expected structure
      if (data && data.Username) {
        // User created successfully, now login
        const loginResponse = await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Username: formData.username,
            Password: formData.password
          })
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          
          localStorage.setItem("user", JSON.stringify(loginData.user));
          localStorage.setItem("token", loginData.token);
          onSignedUp(loginData.user, loginData.token);
          navigate("/");
        } else {
          setServerError("Account created but login failed. Please try logging in manually.");
        }
      } else {
        setServerError("Unexpected response format. Please try again.");
      }
    } catch (error) {
      setServerError(`Network error: ${error.message}. Please check your connection and try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow">
      <Card.Body className="p-4">
        <Card.Title className="text-center mb-4">
          <h2>Create Account</h2>
          <p className="text-muted">Join our movie community today</p>
        </Card.Title>
        
        {serverError && (
          <Alert variant="danger" dismissible onClose={() => setServerError("")}>
            {serverError}
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              placeholder="Enter username"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Enter password"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              At least 5 characters
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              placeholder="Confirm password"
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              isInvalid={!!errors.birthday}
              required
            />
            <Form.Control.Feedback type="invalid">
              {errors.birthday}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-grid gap-2 mb-3">
            <Button 
              variant="primary" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Creating Account...
                </>
              ) : "Sign Up"}
            </Button>
          </div>

          <div className="text-center">
            <p className="text-muted">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};