'use strict';

const DEFAULT_FLAGS = {
  activeCharacter: null,
  hasStarted: false,
};

export default function flags(state = DEFAULT_FLAGS, action) {
  switch (action.type) {

  case 'START': {
    return Object.assign({}, state, { hasStarted: true, activeCharacter: action.id });
  }

  case 'STOP':
  case 'CLEAR': {
    return DEFAULT_FLAGS;
  }

  case 'NEXT': {
    return Object.assign({}, state, { activeCharacter: action.id });
  }

  default: {
    return state;
  }
  }
}
