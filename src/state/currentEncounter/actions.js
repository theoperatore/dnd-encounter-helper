import { createAction } from '../createAction';

export const selectEncounter = createAction('selectEncounter', (id, encountersDefinitions, monstersDefinitions) => {
  const selectedEncounter = encountersDefinitions[id];
  const selectedEncounterMonsters = selectedEncounter
    .monsters
    .map(mid => ({ ...monstersDefinitions[mid], damage: 0 }))
    .reduce((out, monster) => ({
      ...out,
      [monster.id]: {...monster},
    }), {});
  return {
    id,
    monstersDefinitions: selectedEncounterMonsters,
  };
});

export const assignPlayersToEncounter = createAction('assignPlayersToEncounter', (players, playersDefinitions) => {
  const selectedPlayers = players
    .map(pid => ({ ...playersDefinitions[pid], damage: 0 }))
    .reduce((out, player) => ({
      ...out,
      [player.id]: {...player},
    }), {});

  return { playersDefinitions: selectedPlayers };
});

export const startEncounter = createAction('startEncounter', combatantsToInitatives => {
  const order = Object
    .keys(combatantsToInitatives)
    .map(playerMonsterIdsWithCount => ({
      id: playerMonsterIdsWithCount,
      type: playerMonsterIdsWithCount.split(':').length > 1 ? 'monster' : 'player',
      initiative: combatantsToInitatives[playerMonsterIdsWithCount],
    }))
    .sort((a, b) => b.initiative - a.initiative);

  return { order };
});

export const nextParticipant = createAction('nextParticipant');
export const clearEncounter = createAction('clearEncounter');
