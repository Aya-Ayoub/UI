import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProfileProvider } from "./context/ProfileContext";
import { MovieProvider } from "./context/MovieContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProfileProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
    </ProfileProvider>
  </React.StrictMode>
);
