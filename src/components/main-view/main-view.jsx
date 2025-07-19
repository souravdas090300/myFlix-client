import React, { useState, useEffect, useCallback } from "react";
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
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { SearchBar } from "../search-bar/search-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getDisplayMovies = useCallback(() => {
    let moviesToDisplay = movies;
    console.log("All movies:", movies.length);
    console.log("Search query:", searchQuery);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      moviesToDisplay = movies.filter((movie) => {
        const matchesTitle = movie.Title?.toLowerCase().includes(query);
        const matchesGenre = movie.Genre?.Name?.toLowerCase().includes(query);
        const matchesDirector = movie.Director?.Name?.toLowerCase().includes(query);
        const matches = matchesTitle || matchesGenre || matchesDirector;
        
        if (matches) {
          console.log("Movie matches:", movie.Title);
        }
        
        return matches;
      });
    }

    console.log("Movies after search filter:", moviesToDisplay.length);

    // Apply favorites filter
    if (filter === "favorites") {
      moviesToDisplay = moviesToDisplay.filter((movie) =>
        user?.FavoriteMovies?.includes(movie._id)
      );
    }

    console.log("Final movies to display:", moviesToDisplay.length);
    return moviesToDisplay;
  }, [movies, searchQuery, filter, user]);

  const displayMovies = getDisplayMovies();

  const fetchMovies = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");

    try {
      // Wake up Heroku server if sleeping
      await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/", {
        method: "GET",
        mode: "no-cors",
      });
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await fetch(
        "https://movie-flix-fb6c35ebba0a.herokuapp.com/movies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 401
            ? "Please log in again."
            : "Failed to load movies. Please try again."
        );
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      setError(
        error.message || "Network error. Please check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearchChange = useCallback((query) => {
    console.log("Search query changed:", query);
    setSearchQuery(query);
  }, []);

  const handleToggleFavorite = useCallback(
    async (movieId) => {
      try {
        const isFavorite = user.FavoriteMovies.includes(movieId);
        const method = isFavorite ? "DELETE" : "POST";

        const response = await fetch(
          `https://movie-flix-fb6c35ebba0a.herokuapp.com/users/${user.Username}/movies/${movieId}`,
          {
            method,
            headers: {
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
        console.error("Failed to update favorites", error);
      }
    },
    [user, token]
  );

  const MovieViewWrapper = () => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);

    return movie ? (
      <MovieView
        movie={movie}
        onFavorite={handleToggleFavorite}
        isFavorite={user?.FavoriteMovies?.includes(movie._id)}
      />
    ) : (
      <Col>Movie not found.</Col>
    );
  };

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
      <Container className="main-content">
        <Row className="justify-content-center mt-4">{children}</Row>
      </Container>
    </>
  );

  if (!user) {
    return (
      <Container className="auth-container">
        <Row className="justify-content-center">
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
      </Container>
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
              onUserUpdate={(updatedUser) => {
                setUser(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
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
            <Container>
              <Row className="justify-content-center mb-4">
                <Col xs={12} md={8} lg={6}>
                  <SearchBar 
                    initialSearchQuery={searchQuery}
                    onSearchChange={handleSearchChange} 
                  />
                </Col>
              </Row>

              <Row className="justify-content-center mb-4">
                <Col className="text-center">
                  <Button
                    variant={filter === "all" ? "primary" : "outline-primary"}
                    onClick={() => setFilter("all")}
                    className="me-2"
                    disabled={isLoading}
                  >
                    All Movies
                  </Button>
                  <Button
                    variant={
                      filter === "favorites" ? "primary" : "outline-primary"
                    }
                    onClick={() => setFilter("favorites")}
                    disabled={isLoading}
                  >
                    My Favorites
                  </Button>
                </Col>
              </Row>

              {error && (
                <Row className="justify-content-center mb-4">
                  <Col xs={12} md={8} lg={6}>
                    <Alert variant="danger" className="text-center">
                      {error}
                      <Button
                        variant="outline-danger"
                        onClick={fetchMovies}
                        disabled={isLoading}
                        className="mt-2"
                      >
                        {isLoading ? "Loading..." : "Retry"}
                      </Button>
                    </Alert>
                  </Col>
                </Row>
              )}

              {isLoading ? (
                <Col className="text-center my-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </Col>
              ) : displayMovies.length === 0 ? (
                <Col className="text-center my-5">
                  <h4>
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : filter === "favorites"
                      ? "No favorite movies yet"
                      : "No movies available"}
                  </h4>
                  {filter === "favorites" && (
                    <p>Click the heart icon to add favorites</p>
                  )}
                </Col>
              ) : (
                <Row>
                  {displayMovies.map((movie) => (
                    <Col
                      key={movie._id}
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      className="mb-4"
                    >
                      <MovieCard
                        movie={movie}
                        onFavorite={handleToggleFavorite}
                        isFavorite={user.FavoriteMovies.includes(movie._id)}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </AuthenticatedLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

MainView.propTypes = {
  onUserUpdate: PropTypes.func,
  onUserDeregister: PropTypes.func,
};