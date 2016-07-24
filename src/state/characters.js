'use strict';

export default function characters(state = [], action) {
  switch (action.type) {
  case 'CHARACTER_ADDED': {
    return [
      ...state,
      {
        id: action.id,
        name: action.name,
        initiative: action.init,
        hp: action.hp,
        current: action.hp,
      },
    ].sort((a , b) => b.initiative - a.initiative);
  }

  case 'CHARACTER_REMOVED': {
    return state.filter(character => character.id !== action.id);
  }

  case 'CHARACTER_EDIT': {
    let idx = state.findIndex(c => c.id === action.id);
    return [
      ...state.slice(0, idx),
      Object.assign({}, state[idx], action, {
        name: action.name,
        initiative: action.init,
        hp: action.hp,
        current: action.hp,
      }),
      ...state.slice(idx + 1),
    ];
  }

  case 'HP_DECREMENT': {
    let idx = state.findIndex(c => c.id === action.id);
    let newHp = state[idx].current - 1;

    newHp = newHp < 0
    ? 0
    : newHp;

    return [
      ...state.slice(0, idx),
      Object.assign({}, state[idx], { current: newHp }),
      ...state.slice(idx + 1),
    ];
  }

  case 'HP_INCREMENT': {
    let idx = state.findIndex(c => c.id === action.id);
    let newHp = state[idx].current + 1;

    newHp = newHp >= state[idx].hp
    ? state[idx].hp
    : newHp;

    return [
      ...state.slice(0, idx),
      Object.assign({}, state[idx], { current: newHp }),
      ...state.slice(idx + 1),
    ];
  }

  case 'CLEAR': {
    return [];
  }

  default: {
    return state;
  }
  }
}
