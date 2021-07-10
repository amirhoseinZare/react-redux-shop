import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './assets/css/normalize.css'
import { BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux"
import store from "./redux/store"

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </Provider>
,
  document.getElementById('root')
);
