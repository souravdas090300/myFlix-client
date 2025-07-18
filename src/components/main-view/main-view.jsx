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
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { SearchBar } from "../search-bar/search-bar";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' or 'favorites'
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Filter and search logic - simplified without memoization
  const getDisplayMovies = () => {
    let moviesToDisplay = movies;
    
    // Apply search filter if there's a search query
    if (searchQuery && searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      moviesToDisplay = movies.filter((movie) => {
        const titleMatch = movie.Title?.toLowerCase().includes(query);
        const genreMatch = movie.Genre?.Name?.toLowerCase().includes(query);
        const directorMatch = movie.Director?.Name?.toLowerCase().includes(query);
        return titleMatch || genreMatch || directorMatch;
      });
    }
    
    // Apply favorites filter
    if (filter === "favorites") {
      moviesToDisplay = moviesToDisplay.filter((movie) =>
        user?.FavoriteMovies?.includes(movie._id)
      );
    }
    
    return moviesToDisplay;
  };

  const displayMovies = getDisplayMovies();

  // Retry function for failed movie fetching
  const retryFetchMovies = async () => {
    if (!token) return;

    setIsLoading(true);
    setError("");

    try {
      // Try to wake up the Heroku app first
      try {
        await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/", {
          method: "GET",
          mode: "no-cors",
        });
        // Wait a moment for the app to wake up
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (wakeUpError) {
        // Wake-up request failed, but continue with the main request
      }

      const response = await fetch(
        "https://movie-flix-fb6c35ebba0a.herokuapp.com/movies",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        if (response.status === 410) {
          throw new Error(
            "The movie database is temporarily unavailable. The server may be sleeping. Please try again in a few moments."
          );
        } else if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        } else {
          throw new Error(`Failed to fetch movies (${response.status})`);
        }
      }

      const data = await response.json();
      setMovies(data);
      setError("");
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        setError(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setError(error.message || "Unable to load movies. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Simple search handler without any complex logic
  const handleSearchChange = (value) => {
    setSearchQuery(value);
  };

  // Stable filter handlers
  const handleShowAllMovies = () => {
    setFilter("all");
  };

  const handleShowFavorites = () => {
    setFilter("favorites");
  };

  useEffect(() => {
    if (!token) return;

    const fetchMovies = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Try to wake up the Heroku app first
        try {
          await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/", {
            method: "GET",
            mode: "no-cors",
          });
          // Wait a moment for the app to wake up
          await new Promise((resolve) => setTimeout(resolve, 2000));
        } catch (wakeUpError) {
          // Wake-up request failed, but continue with the main request
        }

        const response = await fetch(
          "https://movie-flix-fb6c35ebba0a.herokuapp.com/movies",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          if (response.status === 410) {
            throw new Error(
              "The movie database is temporarily unavailable. The server may be sleeping. Please try again in a few moments."
            );
          } else if (response.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          } else {
            throw new Error(`Failed to fetch movies (${response.status})`);
          }
        }

        const data = await response.json();
        setMovies(data);
        setError("");
      } catch (error) {
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          setError(
            "Network error. Please check your internet connection and try again."
          );
        } else {
          setError(error.message || "Unable to load movies. Please try again later.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [token]);

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
      // Error toggling favorite - silently fail
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
      <Container>
        <Row className="justify-content-md-center mt-4">{children}</Row>
      </Container>
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
            <Container>
              <SearchBar
                initialSearchQuery={searchQuery}
                onSearchChange={handleSearchChange}
              />

              {/* Filter Controls */}
              <Row className="justify-content-center mb-3">
                <Col xs={12} md={8} lg={6} className="text-center">
                  <Button
                    variant={filter === "all" ? "primary" : "outline-primary"}
                    onClick={handleShowAllMovies}
                    className="me-2"
                  >
                    All Movies
                  </Button>
                  <Button
                    variant={
                      filter === "favorites" ? "primary" : "outline-primary"
                    }
                    onClick={handleShowFavorites}
                  >
                    My Favorites
                  </Button>
                </Col>
              </Row>

              {error && (
                <Row className="justify-content-center mb-4">
                  <Col xs={12} md={8} lg={6}>
                    <Alert variant="danger" className="text-center">
                      <Alert.Heading>Connection Error</Alert.Heading>
                      <p>{error}</p>
                      <Button
                        variant="outline-danger"
                        onClick={retryFetchMovies}
                        disabled={isLoading}
                      >
                        {isLoading ? "Retrying..." : "Try Again"}
                      </Button>
                    </Alert>
                  </Col>
                </Row>
              )}

              {/* Filter Indicator */}
              {displayMovies.length > 0 && (
                <Row className="justify-content-center mb-2">
                  <Col xs={12} className="text-center text-muted small">
                    Showing {filter === "favorites" ? "favorite" : "all"} movies
                    {searchQuery && ` matching "${searchQuery}"`}
                  </Col>
                </Row>
              )}

              <Row>
                {isLoading ? (
                  <Col className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">
                      {isSearching ? "Searching movies..." : "Loading movies..."}
                    </p>
                  </Col>
                ) : (!movies && !error) || isSearching ? (
                  <Col className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">
                      {isSearching ? "Searching movies..." : "Loading movies..."}
                    </p>
                  </Col>
                ) : error ? (
                  <Col className="text-center">
                    <p className="text-muted">
                      Please use the "Try Again" button above to reload movies.
                    </p>
                  </Col>
                ) : displayMovies.length === 0 ? (
                  <Col className="text-center">
                    <h4>
                      {searchQuery
                        ? `No movies found for "${searchQuery}"`
                        : filter === "favorites"
                        ? "You haven't marked any favorites yet"
                        : "No movies available"}
                    </h4>
                    {searchQuery ? (
                      <p className="text-muted">Try adjusting your search terms</p>
                    ) : filter === "favorites" ? (
                      <p className="text-muted">
                        Click the heart icon on movies to add them to favorites
                      </p>
                    ) : null}
                  </Col>
                ) : (
                  displayMovies.map((movie) => (
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
                        isFavorite={user.FavoriteMovies?.includes(movie._id)}
                      />
                    </Col>
                  ))
                )}
              </Row>
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