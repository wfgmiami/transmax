import React from "react";
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import "./index.css";
import App from "./App";
import {Router} from "react-router-dom";
import {routes} from "./configs/routesConfig";
import Theme from "./components/Theme";
import history from './history';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Theme>
        <App routes={routes}></App>
      </Theme>
    </Router>
  </Provider>,
   document.getElementById("root")

);
