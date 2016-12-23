import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import App from './_app/App';

import createAppStore from './state';
import './index.less';

const prevState = localStorage.getItem('__dnd-encounter-helper-state__') || '{}';

const root = document.getElementById('root');
const store = createAppStore(JSON.parse(prevState));

FastClick.attach(root);

function render() {
  localStorage.setItem('__dnd-encounter-helper-state__', JSON.stringify(store.getState()));
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
