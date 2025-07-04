import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = ({ user, token, movies, setMovies, onUserUpdate, onUserDeregister }) => {
  useEffect(() => {
    if (!token || (movies && movies.length > 0)) return;

    const fetchMovies = async () => {
      try {
        const response = await fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [token, setMovies, movies]);

  function MovieViewWrapper() {
    const { movieId } = useParams();
    const movie = movies?.find((m) => m._id === movieId);

    if (!movies) return <Col>Loading movies...</Col>;
    if (!movie) return <Col>Movie not found.</Col>;

    return (
      <Col md={8}>
        <MovieView 
          movie={movie} 
          user={user} 
          token={token} 
        />
      </Col>
    );
  }

  const AuthenticatedLayout = ({ children }) => (
    <>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          onUserUpdate(null);
          localStorage.clear();
          window.location.href = '/login';
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
                    onUserUpdate(user);
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
                    onUserUpdate(user);
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
              onUserUpdate={onUserUpdate}
              onUserDeregister={onUserDeregister}
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
            {!movies ? (
              <Col>Loading movies...</Col>
            ) : movies.length === 0 ? (
              <Col>No movies found.</Col>
            ) : (
              movies.map((movie) => (
                <Col key={movie._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <MovieCard 
                    movie={movie} 
                    user={user} 
                    token={token} 
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