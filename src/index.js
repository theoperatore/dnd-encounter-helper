import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import App from './_app/App';

import createAppStore from './state';
import './index.less';

const root = document.getElementById('root');
const store = createAppStore();

FastClick.attach(root);

function render() {
  ReactDOM.render(
    <App
      state={store.getState()}
      dispatch={store.dispatch}
    />,
    root
  );
}

render();
store.subscribe(render);
