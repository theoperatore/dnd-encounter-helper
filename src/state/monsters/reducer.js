const defaultState = [];

export function monsters(state = defaultState, action) {
  switch (action.type) {
    case 'addMonster':
      return [
        ...state,
        action.monster,
      ];
    default:
      return state;
  }
}
