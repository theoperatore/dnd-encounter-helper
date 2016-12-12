import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import App from './_app/App';

import './index.less';

const root = document.getElementById('root');

FastClick.attach(root);

ReactDOM.render(
  <App />,
  root
);
