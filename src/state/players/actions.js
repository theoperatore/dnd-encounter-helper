import uuid from 'node-uuid';

export function _addPlayer(name) {
  return {
    type: 'addPlayer',
    player: {
      id: uuid.v1(),
      name,
    },
  };
}

export function addPlayer(name) {
  return dispatch => {

    // TODO: persist
    return dispatch(_addPlayer(name));
  }
}
