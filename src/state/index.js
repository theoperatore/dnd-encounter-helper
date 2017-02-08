import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddlware from 'redux-thunk';

import { currentEncounter } from './currentEncounter/reducer';
import { encounters, encountersDefinitions } from './encounters/reducer';
import { players, playersDefinitions } from './players/reducer';
import { monsters, monstersDefinitions } from './monsters/reducer';
import { user } from './user/reducer';

export default function createAppStore(initialState) {
  return createStore(
    combineReducers({
      currentEncounter,
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
