import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';

import { characters } from './characters/reducer';
import { encounter } from './encounter/reducer';
import { encounters, encountersDefinitions } from './encounters/reducer';
import { players, playersDefinitions } from './players/reducer';
import { monsters, monstersDefinitions } from './monsters/reducer';
import { user } from './user/reducer';

export default function createAppStore(initialState) {
  return createStore(
    combineReducers({
      characters,
      encounter,
      encounters,
      encountersDefinitions,
      players,
      playersDefinitions,
      monsters,
      monstersDefinitions,
      user,
    }),
    initialState,
    applyMiddleware(thunkMiddlware)
  );
}
