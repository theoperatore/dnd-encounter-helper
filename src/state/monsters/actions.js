import uuid from 'node-uuid';

export function _addMonster(name) {
  return {
    type: 'addMonster',
    monster: {
      id: uuid.v1(),
      name,
    },
  };
}

export function addMonster(name) {
  return dispatch => {

    // TODO: persist
    return dispatch(_addMonster(name));
  }
}
