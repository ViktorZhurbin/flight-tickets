import React from 'react';
import ReactDOM from 'react-dom';

import '@babel/polyfill';
import 'react-dates/initialize';

import App from './containers/App';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));