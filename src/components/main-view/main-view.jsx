import React, { useState, useEffect, useCallback, useMemo, useTransition, startTransition as reactStartTransition } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { VirtualizedMovieGrid } from "../virtualized-movie-grid/virtualized-movie-grid";
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
import { usePerformanceMonitor, useMemoryMonitor } from "../../utils/performance-monitor";

// Top-level memoized components to prevent remounts caused by redefining
// them inside MainView. These receive all data via props so they don't
// close over MainView locals and remain stable across renders.
const MovieViewWrapper = React.memo(({ movies, onFavorite, user }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);

  return movie ? (
    <MovieView
      movie={movie}
      onFavorite={onFavorite}
      isFavorite={user?.FavoriteMovies?.includes(movie._id)}
    />
  ) : (
    <Col>Movie not found.</Col>
  );
});
MovieViewWrapper.displayName = 'MovieViewWrapper';

const AuthenticatedLayout = React.memo(({
  user,
  onLoggedOut,
  onSearchChange,
  filter,
  onShowAll,
  onShowFavorites,
  isLoading,
  allCount,
  favoritesCount,
  children
}) => (
  <>
    <NavigationBar user={user} onLoggedOut={onLoggedOut} />
    <Container className="main-content">
      <Row className="justify-content-center mt-3 mb-2">
        <Col xs={12} md={8} lg={6}>
          <SearchBar onSearchChange={onSearchChange} />
        </Col>
      </Row>

      <Row className="justify-content-center mb-3">
        <Col xs={12} md={8} lg={6} className="text-center">
          <div className="filter-buttons d-inline-block">
            <Button
              variant={filter === "all" ? "primary" : "outline-primary"}
              onClick={onShowAll}
              className="me-2"
              disabled={isLoading}
              size="sm"
            >
              All Movies ({allCount})
            </Button>
            <Button
              variant={filter === "favorites" ? "primary" : "outline-primary"}
              onClick={onShowFavorites}
              disabled={isLoading}
              size="sm"
            >
              My Favorites ({favoritesCount})
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center mt-4">{children}</Row>
    </Container>
  </>
));
AuthenticatedLayout.displayName = 'AuthenticatedLayout';

export const MainView = () => {
  // Performance monitoring in development
  usePerformanceMonitor('MainView');
  useMemoryMonitor();

  // Safely parse stored user/token; avoid throwing if localStorage entry is missing or invalid
  let storedUser = null;
  try {
    const raw = localStorage.getItem("user");
    storedUser = raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.warn('Failed to parse stored user', e);
    storedUser = null;
  }
  const storedToken = localStorage.getItem("token") || null;
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deferredSearchQuery, setDeferredSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [useVirtualization, setUseVirtualization] = useState(true); // Toggle for testing

  // Normalize movies for search optimization
  const normalizedMovies = useMemo(() => {
    if (!movies || movies.length === 0) return [];
    
    return movies.map(movie => ({
      ...movie,
      searchableTitle: movie.Title?.toLowerCase() || '',
      searchableGenre: movie.Genre?.Name?.toLowerCase() || '',
      searchableDirector: movie.Director?.Name?.toLowerCase() || ''
    }));
  }, [movies]);

// Optimized filter calculation with React 18 transitions
const { displayMovies, allCount, favoritesCount } = useMemo(() => {
  // Early return if no movies
  if (!normalizedMovies.length) {
    return { displayMovies: [], allCount: 0, favoritesCount: 0 };
  }

  // Pre-compute query once
  const query = deferredSearchQuery.trim().toLowerCase();
  const hasQuery = query.length > 0;

  // Search filter function - highly optimized
  const filterFn = (movie) => {
    if (!hasQuery) return true;
    
    // Use pre-computed lowercase strings
    return movie.searchableTitle.includes(query) ||
           movie.searchableGenre.includes(query) ||
           movie.searchableDirector.includes(query);
  };

  // Get favorite movies if needed
  const favoriteMovies = user?.FavoriteMovies
    ? normalizedMovies.filter(movie => user.FavoriteMovies.includes(movie._id))
    : [];

  // Only filter if there's a query
  const filteredAll = hasQuery 
    ? normalizedMovies.filter(filterFn)
    : normalizedMovies;

  const filteredFavorites = hasQuery
    ? favoriteMovies.filter(filterFn)
    : favoriteMovies;

  return {
    displayMovies: filter === "favorites" ? filteredFavorites : filteredAll,
    allCount: filteredAll.length,
    favoritesCount: filteredFavorites.length
  };
}, [normalizedMovies, deferredSearchQuery, filter, user]);

  // debug removed to avoid TDZ errors in some bundling environments

// Optimized search handler
// Keep parent updates light: do not set `searchQuery` on every keystroke to avoid
// re-rendering the main layout. SearchBar manages local input and will call this
// handler after debounce; we only update the deferred value inside a transition.
const handleSearchChange = useCallback((query) => {
  reactStartTransition(() => {
    setDeferredSearchQuery(query);
  });
}, []);

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

// Reset filter when user changes or movies are loaded
useEffect(() => {
  if (filter === "favorites" && (!user?.FavoriteMovies || user.FavoriteMovies.length === 0)) {
    setFilter("all");
  }
}, [user, movies, filter]);

const handleFilterChange = useCallback((newFilter) => {
  setFilter(newFilter);
}, []);

// Memoize specific filter handlers to prevent re-renders
const handleShowAll = useCallback(() => setFilter("all"), []);
const handleShowFavorites = useCallback(() => setFilter("favorites"), []);

const handleToggleFavorite = useCallback(
  async (movieId) => {
    if (!user?.FavoriteMovies) return;

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

// (Inner duplicate MovieViewWrapper removed - using top-level memoized version)

// Memoize logout handler to prevent NavigationBar re-renders
const handleLogout = useCallback(() => {
  setUser(null);
  setToken(null);
  localStorage.clear();
}, []);

// Memoize login handler to prevent re-creation
const handleLogin = useCallback((user, token) => {
  setUser(user);
  setToken(token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}, []);

// Memoize user update handlers
const handleUserUpdate = useCallback((updatedUser) => {
  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
}, []);

const handleUserDeregister = useCallback(() => {
  setUser(null);
  setToken(null);
  localStorage.clear();
}, []);

// Toggle virtualization for performance testing
const handleToggleVirtualization = useCallback(() => {
  setUseVirtualization(prev => !prev);
}, []);

// (Inner duplicate AuthenticatedLayout removed - using top-level memoized version)

if (!user) {
  return (
    <Container className="auth-container">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Routes>
            <Route
              path="/login"
              element={
                <LoginView onLoggedIn={handleLogin} />
              }
            />
            <Route
              path="/signup"
              element={
                <SignupView onSignedUp={handleLogin} />
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
  <>
    <Routes>
      <Route
        path="/profile"
        element={
          <AuthenticatedLayout
            user={user}
            onLoggedOut={handleLogout}
            onSearchChange={handleSearchChange}
            filter={filter}
            onShowAll={handleShowAll}
            onShowFavorites={handleShowFavorites}
            isLoading={isLoading}
            allCount={allCount}
            favoritesCount={favoritesCount}
          >
            <ProfileView
              user={user}
              token={token}
              movies={movies}
              onUserUpdate={handleUserUpdate}
              onUserDeregister={handleUserDeregister}
            />
          </AuthenticatedLayout>
        }
      />
      <Route
        path="/movies/:movieId"
        element={
          <AuthenticatedLayout
            user={user}
            onLoggedOut={handleLogout}
            onSearchChange={handleSearchChange}
            filter={filter}
            onShowAll={handleShowAll}
            onShowFavorites={handleShowFavorites}
            isLoading={isLoading}
            allCount={allCount}
            favoritesCount={favoritesCount}
          >
            <MovieViewWrapper
              movies={movies}
              onFavorite={handleToggleFavorite}
              user={user}
            />
          </AuthenticatedLayout>
        }
      />
        <Route
        path="/"
        element={
          <AuthenticatedLayout
            user={user}
            onLoggedOut={handleLogout}
            onSearchChange={handleSearchChange}
            filter={filter}
            onShowAll={handleShowAll}
            onShowFavorites={handleShowFavorites}
            isLoading={isLoading}
            allCount={allCount}
            favoritesCount={favoritesCount}
          >
            <Container>
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

              {!isLoading && movies.length > 0 && (
                <Row className="justify-content-center mb-3">
                  <Col className="text-center">
                    <small className="text-muted">
                      {filter === "all" 
                        ? deferredSearchQuery 
                          ? `Showing ${displayMovies.length} of ${movies.length} movies matching "${deferredSearchQuery}"` 
                          : `Showing all ${displayMovies.length} movies`
                        : `Showing ${displayMovies.length} favorite movies`
                      }
                      {isPending && <span className="ms-2">🔍 Filtering...</span>}
                    </small>
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
                    {deferredSearchQuery
                      ? `No results for "${deferredSearchQuery}"`
                      : filter === "favorites"
                      ? "No favorite movies yet"
                      : "No movies available"}
                  </h4>
                  {filter === "favorites" && (
                    <p>Click the heart icon to add favorites</p>
                  )}
                </Col>
              ) : useVirtualization && displayMovies.length > 20 ? (
                // Use virtualization for large lists
                <VirtualizedMovieGrid
                  movies={displayMovies}
                  onFavorite={handleToggleFavorite}
                  userFavorites={user?.FavoriteMovies || []}
                  containerHeight={600}
                  itemsPerRow={4}
                />
              ) : (
                // Traditional grid for smaller lists
                <Row className="movie-grid-container">
                  {displayMovies.map((movie) => (
                    <Col
                      key={movie._id}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={4}
                      xl={3}
                      className="mb-4 d-flex"
                    >
                      <MovieCard
                        movie={movie}
                        onFavorite={handleToggleFavorite}
                        isFavorite={user?.FavoriteMovies?.includes(movie._id) || false}
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
    </>
  );
};

MainView.propTypes = {
  onUserUpdate: PropTypes.func,
  onUserDeregister: PropTypes.func,
};