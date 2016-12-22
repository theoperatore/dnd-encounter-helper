import uuid from 'node-uuid';

export function _addEncounter(name, monsters) {
  return {
    type: 'addEncounter',
    encounter: {
      id: uuid.v1(),
      name,
      monsters,
    },
  };
}

export function addPlayersToEncounter(id, players) {
  return {
    type: 'addPlayersToEncounter',
    id,
    players,
  };
}

export function addEncounter(name, monsters) {
  return dispatch => {

    // TODO: persist
    return dispatch(_addEncounter(name, monsters));
  }
}
