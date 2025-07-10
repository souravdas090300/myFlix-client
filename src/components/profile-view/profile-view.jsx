import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Form, Card, Row, Col } from "react-bootstrap";

export const ProfileView = ({
  user,
  token,
  movies,
  onUserUpdate,
  onUserDeregister
}) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [password, setPassword] = useState("");
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const favoriteMovies = movies?.filter((movie) =>
    user.FavoriteMovies?.includes(movie._id)
  ) || [];

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!password) {
      setError("Please enter your current password to confirm changes");
      return;
    }
    
    setUpdating(true);
    setError("");
    setSuccess("");
    try {
      const response = await fetch(
        `https://movie-flix-fb6c35ebba0a.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            Username: username,
            Password: password,
            Email: email
          })
        }
      );
      if (!response.ok) throw new Error("Update failed");
      const updatedUser = await response.json();
      setSuccess("Profile updated successfully!");
      onUserUpdate(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setPassword("");
    } catch (err) {
      setError(err.message || "Could not update profile.");
    } finally {
      setUpdating(false);
    }
  };

  const handleDeregister = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      const response = await fetch(
        `https://movie-flix-fb6c35ebba0a.herokuapp.com/users/${user.Username}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (!response.ok) throw new Error("Deregistration failed");
      onUserDeregister();
      localStorage.clear();
      window.location.href = "/";
    } catch (err) {
      setError("Could not delete account.");
    }
  };

  return (
    <Row className="justify-content-md-center">
      <Col md={8} lg={6}>
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>Profile</Card.Title>
            <Form onSubmit={handleUpdate}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={5}
                  placeholder="Enter your current password if you don't want to change it"
                />
                <Form.Text className="text-muted">
                  Enter your current password to confirm changes or set a new password
                </Form.Text>
              </Form.Group>
              {error && <div className="text-danger mb-2">{error}</div>}
              {success && <div className="text-success mb-2">{success}</div>}
              <Button type="submit" variant="primary" disabled={updating}>
                {updating ? "Updating..." : "Update Profile"}
              </Button>
              <Button
                variant="danger"
                className="ms-2"
                onClick={handleDeregister}
              >
                Delete Account
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title>Favorite Movies</Card.Title>
            {favoriteMovies.length === 0 ? (
              <div>You have no favorite movies.</div>
            ) : (
              <Row>
                {favoriteMovies.map((movie) => (
                  <Col key={movie._id} xs={12} sm={6} md={4} className="mb-3">
                    <Card>
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        <Card.Text>{movie.Description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

ProfileView.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  movies: PropTypes.array,
  onUserUpdate: PropTypes.func.isRequired,
  onUserDeregister: PropTypes.func.isRequired
};