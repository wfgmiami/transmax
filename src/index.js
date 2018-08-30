import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router } from "react-router-dom";
import { routes } from "./configs/routesConfig";
import Theme from "./components/Theme";
import history from './history';

ReactDOM.render(
  <Router history={history}>
    <Theme>
      <App routes={routes}></App>
    </Theme>
  </Router>,
  document.getElementById("root")
);
