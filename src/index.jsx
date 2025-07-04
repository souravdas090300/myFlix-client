import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // <-- Add this import
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.scss";
import { MainView } from "./components/main-view/main-view";

const App = () => {
  return (
    <BrowserRouter>  {/* <-- Wrap MainView with BrowserRouter */}
      <MainView />
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);