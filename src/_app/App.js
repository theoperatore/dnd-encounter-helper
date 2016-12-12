import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';

import EncounterMenu from './containers/EncounterMenu';
import ProfileMenu from './containers/ProfileMenu';
import Character from './containers/Character';

import './app.less';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      encounterMenuOpen: false,
      profileMenuOpen: false,
    };
  }

  render() {
    const characters = [];

    return (
      <div className="app">
        <Navbar
          title={'Test Encouter 1'}
          onLeftMenuClick={() => this.setState({ encounterMenuOpen: true })}
          onRightMenuClick={() => this.setState({ profileMenuOpen: true })}
        />
        <div className='app-content'>
          {characters.length === 0 && (
            <div>
              <p className='app-subtext'>No participants in this encounter...</p>
              <button className='app-subtext-btn app-subtext-btn-ok'><span className='fa fa-check'></span> Complete</button>
              <button className='app-subtext-btn app-subtext-btn-del'><span className='fa fa-remove'></span> Delete</button>
            </div>
          )}
          {characters.map(character => (
            <Character
              key={character.id}
              id={character.id}
              name={character.name}
              initiative={character.initiative}
              statuses={character.statuses}
            />
          ))}
        </div>
        <EncounterMenu
          open={this.state.encounterMenuOpen}
          onDismiss={() => this.setState({ encounterMenuOpen: false })}
          onAddEncounter={() => {}}
          onAddPlayer={() => {}}
          onAddMonster={() => {}}
          onEncounterSelect={() => {}}
          onPlayerSelect={() => {}}
          onMonsterSelect={() => {}}
          encounters={[{ id: 'enc-1', name: 'Test Encounter 1'}]}
          players={[]}
          monsters={[]}
        />
        <ProfileMenu
          open={this.state.profileMenuOpen}
          onDismiss={() => this.setState({ profileMenuOpen: false })}
        />
      </div>
    )
  }
}
