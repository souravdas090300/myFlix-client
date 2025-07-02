import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import "./movie-view.scss";
import Container from 'react-bootstrap/Container';

const App = () => (
  <Container>
    <MainView />
  </Container>
);

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);