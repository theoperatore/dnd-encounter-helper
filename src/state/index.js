import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';

import { characters } from './characters/reducer';
import { encounter } from './encounter/reducer';
import { encounters } from './encounters/reducer';
import { players } from './players/reducer';
import { monsters } from './monsters/reducer';
import { user } from './user/reducer';

export default function createAppStore(initialState) {
  return createStore(
    combineReducers({
      characters,
      encounter,
      encounters,
      players,
      monsters,
      user,
    }),
    initialState,
    applyMiddleware(thunkMiddlware)
  );
}
