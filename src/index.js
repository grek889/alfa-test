import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Provider store={store}>
            <App />
          </Provider>
        }
      />
    </Routes>
  </Router>
);
