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
          {encounters.map(encounter => (
            <button
              key={encounter.id}
              title={encounter.name}
              onClick={() => onEncounterSelect(encounter.id)}
            >{encounter.name}</button>
          ))}
        </div>
      </div>
      <div className='encounter-menu-body-section'>
        <div className='encounter-menu-body-section-header' onClick={onAddPlayer}>
          <h5>Players</h5>
          <span className='fa fa-plus-circle'></span>
        </div>
        <div className='encounter-menu-body-section-list'>
          {players.map(player => (
            <button
              key={player.id}
              title={player.name}
              onClick={() => onPlayerSelect(player.id)}
            >{player.name}</button>
          ))}
        </div>
      </div>
      <div className='encounter-menu-body-section'>
        <div className='encounter-menu-body-section-header' onClick={onAddMonster}>
          <h5>Monsters</h5>
          <span className='fa fa-plus-circle'></span>
        </div>
        <div className='encounter-menu-body-section-list'>
          {monsters.map(monster => (
            <button
              key={monster.id}
              title={monster.name}
              onClick={() => onMonsterSelect(monster.id)}
            >{monster.name}</button>
          ))}
        </div>
      </div>
    </div>
  </div>
}
