import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";

export const MainView = ({ onUserUpdate, onUserDeregister }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filterQuery, setFilterQuery] = useState("");

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      try {
        const response = await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
        setFilteredMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [token]);

  // Filter movies based on search query
  useEffect(() => {
    if (!filterQuery.trim()) {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.Title.toLowerCase().includes(filterQuery.toLowerCase()) ||
        movie.Genre.Name.toLowerCase().includes(filterQuery.toLowerCase()) ||
        movie.Director.Name.toLowerCase().includes(filterQuery.toLowerCase())
      );
      setFilteredMovies(filtered);
    }
  }, [filterQuery, movies]);

  const handleToggleFavorite = async (movieId) => {
    try {
      const isFavorite = user.FavoriteMovies?.includes(movieId);
      const method = isFavorite ? "DELETE" : "POST";
      
      const response = await fetch(
        `https://movie-flix-fb6c35ebba0a.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  function MovieViewWrapper() {
    const { movieId } = useParams();
    const movie = movies?.find((m) => m._id === movieId);

    if (!movies) return <Col>Loading movies...</Col>;
    if (!movie) return <Col>Movie not found.</Col>;

    return (
      <MovieView 
        movie={movie} 
        onFavorite={handleToggleFavorite}
        isFavorite={user.FavoriteMovies?.includes(movie._id)}
      />
    );
  }

  const AuthenticatedLayout = ({ children }) => (
    <>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center mt-4">
        {children}
      </Row>
    </>
  );

  if (!user) {
    return (
      <Row className="justify-content-md-center">
        <Col md={6} lg={5}>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginView
                  onLoggedIn={(user, token) => {
                    setUser(user);
                    setToken(token);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                  }}
                />
              }
            />
            <Route 
              path="/signup" 
              element={
                <SignupView 
                  onSignedUp={(user, token) => {
                    setUser(user);
                    setToken(token);
                    localStorage.setItem("user", JSON.stringify(user));
                    localStorage.setItem("token", token);
                  }} 
                />
              } 
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Col>
      </Row>
    );
  }

  return (
    <Routes>
      <Route
        path="/profile"
        element={
          <AuthenticatedLayout>
            <ProfileView
              user={user}
              token={token}
              movies={movies}
              onUserUpdate={(user) => {
                setUser(user);
                localStorage.setItem("user", JSON.stringify(user));
              }}
              onUserDeregister={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <AuthenticatedLayout>
            <MovieViewWrapper />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/"
        element={
          <AuthenticatedLayout>
            <Row className="mb-4">
              <Col>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by title, genre, or director..."
                    value={filterQuery}
                    onChange={(e) => setFilterQuery(e.target.value)}
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Col>
            </Row>
            {!filteredMovies ? (
              <Col>Loading movies...</Col>
            ) : filteredMovies.length === 0 ? (
              <Col>No movies found.</Col>
            ) : (
              filteredMovies.map((movie) => (
                <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <MovieCard 
                    movie={movie} 
                    onFavorite={handleToggleFavorite}
                    isFavorite={user.FavoriteMovies?.includes(movie._id)}
                  />
                </Col>
              ))
            )}
          </AuthenticatedLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

MainView.propTypes = {
  onUserUpdate: PropTypes.func,
  onUserDeregister: PropTypes.func
};