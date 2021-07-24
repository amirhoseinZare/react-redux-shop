import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/index.css';
import './assets/css/normalize.css'

import App from './App.jsx';

import { BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux"
import store, {persistor} from "./redux/store"
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </PersistGate>
  </Provider>
,
  document.getElementById('root')
);
