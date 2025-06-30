import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movie-flix-fb6c35ebba0a.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  if (!user) {
    return <LoginView />;
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      padding: "20px"
    }}>
      {movies.map((movie) => (
        <MovieCard
          key={movie._id || movie.ID || movie.id}
          movie={movie}
          onMovieClick={setSelectedMovie}
        />
      ))}
    </div>
  );
};