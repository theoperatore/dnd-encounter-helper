'use strict';

import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import FastClick from 'fastclick';

import App from './App';
import reducers from './state';

const mount = document.querySelector('#mount');
new FastClick(document.body);

const characters = JSON.parse(localStorage.getItem('__dnd_companion_encounter_helper_players')) || [];

const logger = createLogger();
const store = createStore(reducers, { characters }, applyMiddleware(thunk, logger));

store.subscribe(() => {
  const toSave = JSON.stringify(store.getState().characters);
  localStorage.setItem('__dnd_companion_encounter_helper_players', toSave);

  render(<App dispatch={store.dispatch} state={store.getState()} />, mount);
})

render(<App dispatch={store.dispatch} state={store.getState()} />, mount);
