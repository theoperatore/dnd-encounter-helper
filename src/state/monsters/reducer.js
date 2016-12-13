export function monsters(state = [], action) {
  switch (action.type) {
    case 'addMonster':
      return [
        ...state,
        action.monster.id,
      ];
    default:
      return state;
  }
}

export function monstersDefinitions(state = {}, action) {
  switch (action.type) {
    case 'addMonster': {
      return {
        ...state,
        [action.monster.id]: {
          ...action.monster,
        },
      };
    }
    default:
      return state;
  }
}
