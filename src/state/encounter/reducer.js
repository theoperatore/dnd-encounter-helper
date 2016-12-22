const defaultState = {
  participants: [],
  selectedEncounter: null,
  startEncounterId: null,
};

export function encounter(state = defaultState, action) {
  switch (action.type) {
    case 'selectEncounter': {
      return {
        ...state,
        startEncounterId: action.id,
      }
    }
    case 'startEncounter': {
      return {
        ...state,
        selectedEncounter: action.id,
        participants: action
          .initiatives
          .sort((a, b) => b.init - a.init),
      };
    }
    default:
      return state;
  }
}
