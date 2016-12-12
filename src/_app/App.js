import React, { Component } from 'react';
import Navbar from './components/Navbar/Navbar';

import EncounterMenu from './containers/EncounterMenu';
import ProfileMenu from './containers/ProfileMenu';

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
    return (
      <div className="app">
        <Navbar
          title={'Encouter 1'}
          onLeftMenuClick={() => this.setState({ encounterMenuOpen: true })}
          onRightMenuClick={() => this.setState({ profileMenuOpen: true })}
        />
        <EncounterMenu
          open={this.state.encounterMenuOpen}
          onDismiss={() => this.setState({ encounterMenuOpen: false })}
          onAddEncounter={() => {}}
          onAddPlayer={() => {}}
          onAddMonster={() => {}}
          onEncounterSelect={() => {}}
          onPlayerSelect={() => {}}
          onMonsterSelect={() => {}}
          encounters={[{ id: 'enc-1', name: 'Encounter 1'}]}
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
