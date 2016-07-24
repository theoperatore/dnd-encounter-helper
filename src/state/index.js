'use strict';

import { combineReducers } from 'redux';
import characters from './characters';
import flags from './flags';

export default combineReducers({
  characters,
  flags,
});
