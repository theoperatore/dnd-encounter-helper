import React from 'react';
import './EncounterMenu.less';

const noop = () => {};

export default function EncounterMenuContent(props) {
  const {
    onAddEncounter = noop,
    onAddPlayer = noop,
    onAddMonster = noop,
    onEncounterSelect = noop,
    onPlayerSelect = noop,
    onMonsterSelect = noop,
    encounters = [],
    players = [],
    monsters = [],
    encountersDefinitions = {},
    playersDefinitions = {},
    monstersDefinitions = {},
    title = 'DM Companion'
  } = props;

  return <div className='encounter-menu'>
    <div className='encounter-menu-title'>
      <img
        src='./icon.png'
        role='presentation'
        height='48'
        width='48'
      />
      <h3>{title}</h3>
    </div>
    <div className='encounter-menu-body'>
      <div className='encounter-menu-body-section'>
        <div className='encounter-menu-body-section-header' onClick={onAddEncounter}>
          <h5>Encounters</h5>
          <span className='fa fa-plus-circle'></span>
        </div>
        <div className='encounter-menu-body-section-list'>
          {encounters.map(id => (
            <button
              key={encountersDefinitions[id].id}
              title={encountersDefinitions[id].name}
              onClick={() => onEncounterSelect(encountersDefinitions[id].id)}
            >{encountersDefinitions[id].name}</button>
          ))}
        </div>
      </div>
      <div className='encounter-menu-body-section'>
        <div className='encounter-menu-body-section-header' onClick={onAddPlayer}>
          <h5>Players</h5>
          <span className='fa fa-plus-circle'></span>
        </div>
        <div className='encounter-menu-body-section-list'>
          {players.map(id => (
            <button
              key={playersDefinitions[id].id}
              title={playersDefinitions[id].name}
              onClick={() => onPlayerSelect(playersDefinitions[id].id)}
            >{playersDefinitions[id].name}</button>
          ))}
        </div>
      </div>
      <div className='encounter-menu-body-section'>
        <div className='encounter-menu-body-section-header' onClick={onAddMonster}>
          <h5>Monsters</h5>
          <span className='fa fa-plus-circle'></span>
        </div>
        <div className='encounter-menu-body-section-list'>
          {monsters.map(id => (
            <button
              key={monstersDefinitions[id].id}
              title={monstersDefinitions[id].name}
              onClick={() => onMonsterSelect(monstersDefinitions[id].id)}
            >{monstersDefinitions[id].name}</button>
          ))}
        </div>
      </div>
    </div>
  </div>
}
