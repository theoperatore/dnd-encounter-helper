const defaultState = [];

export function players(state = defaultState, action) {
  switch (action.type) {
    case 'addPlayer': {
      return [
        ...state,
        action.player,
      ];
    }
    default:
      return state;
  }
}
