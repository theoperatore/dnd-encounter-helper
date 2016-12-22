function _startEncounter(id, initiatives) {
  return {
    type: 'startEncounter',
    id,
    initiatives,
  };
}

export function setupEncounter(id, uriToInits) {
  return dispatch => {
    const initiatives = Object.keys(uriToInits)
      .map(uri => ({
        uri,
        init: uriToInits[uri],
      }));

    dispatch(_startEncounter(id, initiatives));
  }
}

export function selectEncounter(id) {
  return {
    type: 'selectEncounter',
    id,
  };
}
