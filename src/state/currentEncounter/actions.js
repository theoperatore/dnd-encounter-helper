export function selectEncounter(id, monstersDefinitions) {
  return {
    type: 'selectEncounter',
    id,
    monstersDefinitions,
  };
}

export function assignPlayersToEncounter(playersDefinitions) {
  return {
    type: 'assignPlayersToEncounter',
    playersDefinitions,
  };
}

export function startEncounter(order) {
  return {
    type: 'startEncounter',
    order,
  };
}

export function nextParticipant() {
  return {
    type: 'nextParticipant',
  };
}

export function clearEncounter() {
  return {
    type: 'clearEncounter',
  };
}
