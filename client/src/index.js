import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createBrowserHistory } from "history";
import { Router } from "react-router";

import "./assets/scss/material-kit-pro-react.scss";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <App />
  </Router>,
  document.getElementById("root")
);
