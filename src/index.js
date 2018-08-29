import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {routes} from './configs/routesConfig';

ReactDOM.render(<App />, document.getElementById('root'));


ReactDOM.render(
    <BrowserRouter>
        <App routes={routes}>
             routes={routes}
        </App>
    </BrowserRouter>
    , document.getElementById('root'));