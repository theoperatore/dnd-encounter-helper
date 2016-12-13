export function encounters(state = [], action) {
  switch (action.type) {
    case 'addEncounter': {
      return [
        ...state,
        action.encounter.id,
      ];
    }
    default:
      return state;
  }
}

export function encountersDefinitions(state = {}, action) {
  switch (action.type) {
    case 'addEncounter': {
      return {
        ...state,
        [action.encounter.id]: {
          ...action.encounter,
        },
      };
    }
    default:
      return state;
  }
}
