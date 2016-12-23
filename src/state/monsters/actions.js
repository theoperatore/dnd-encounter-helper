import uuid from 'node-uuid';

export function _addMonster(name, maxHp) {
  return {
    type: 'addMonster',
    monster: {
      id: uuid.v1(),
      name,
      maxHp,
    },
  };
}

export function addMonster(name, maxHp) {
  return dispatch => {

    // TODO: persist
    return dispatch(_addMonster(name, maxHp));
  }
}
