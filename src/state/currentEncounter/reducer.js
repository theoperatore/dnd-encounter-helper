const defaultState = {};

export function currentEncounter(state = defaultState, action) {
  switch (action.type) {
    case 'selectEncounter': {
      return {
        id: action.id,
        monstersDefinitions: {...action.monstersDefinitions},
      };
    }
    case 'assignPlayersToEncounter': {
      return {
        ...state,
        playersDefinitions: {...action.playersDefinitions},
      };
    }
    case 'startEncounter': {
      return {
        ...state,
        activeIndex: 0,
        order: [...action.order],
      }
    }
    case 'nextParticipant': {
      return {
        ...state,
        activeIndex: (state.activeIndex + 1) % state.order.length,
      }
    }
    case 'clearEncounter': {
      return {};
    }
    default: {
      return state;
    }
  }
}
