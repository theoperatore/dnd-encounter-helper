export function players(state = [], action) {
  switch (action.type) {
    case 'addPlayer': {
      return [
        ...state,
        action.player.id,
      ];
    }
    default:
      return state;
  }
}

export function playersDefinitions(state = {}, action) {
  switch (action.type) {
    case 'addPlayer': {
      return {
        ...state,
        [action.player.id]: {
          ...action.player,
        },
      };
    }
    default:
      return state;
  }
}
