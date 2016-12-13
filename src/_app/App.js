import React, { Component, PropTypes } from 'react';
import Navbar from './components/Navbar/Navbar';

import EncounterMenu from './containers/EncounterMenu';
import ProfileMenu from './containers/ProfileMenu';
import Character from './containers/Character';
import CreateEncounterModal from './containers/EncounterModals/create';
import CreatePlayerModal from './containers/PlayerModals/create';
import CreateMonsterModal from './containers/MonsterModals/create';

import { addPlayer } from '../state/players/actions';
import { addMonster } from '../state/monsters/actions';

import './app.less';

export default class App extends Component {
  static propTypes = {
    state: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      encounterMenuOpen: false,
      profileMenuOpen: false,
      newEncounterModalOpen: false,
      newPlayerModalOpen: false,
      newMonsterModalOpen: false,
    };

    this.handleAddEncounter = this.handleAddEncounter.bind(this);
    this.handleAddPlayer = this.handleAddPlayer.bind(this);
    this.handleAddMonster = this.handleAddMonster.bind(this);
  }

  handleAddEncounter(name, monsters) {
    console.log(name, monsters);
  }

  handleAddPlayer(newPlayerName) {
    this.props.dispatch(addPlayer(newPlayerName));
    this.setState({ newPlayerModalOpen: false });
  }

  handleAddMonster(newMonsterName) {
    this.props.dispatch(addMonster(newMonsterName));
    this.setState({ newMonsterModalOpen: false });
  }

  render() {
    const {
      encounter,
      characters,
      encounters,
      encountersDefinitions,
      monsters,
      monstersDefinitions,
      players,
      playersDefinitions,
    } = this.props.state;

    return (
      <div className="app">
        <Navbar
          title={'Test Encouter 1'}
          onLeftMenuClick={() => this.setState({ encounterMenuOpen: true })}
          onRightMenuClick={() => this.setState({ profileMenuOpen: true })}
        />
        <div className='app-content'>
          {encounter.order.length === 0 && (
            <div>
              <p className='app-subtext'>No participants in this encounter...</p>
              {/* <button className='app-subtext-btn app-subtext-btn-ok'><span className='fa fa-check'></span> Complete</button> */}
              {/* <button className='app-subtext-btn app-subtext-btn-del'><span className='fa fa-remove'></span> Delete</button> */}
            </div>
          )}
          {encounter.order.map(charId => {
            const character = characters[charId];
            return <Character
              key={character.id}
              id={character.id}
              name={character.name}
              initiative={character.initiative}
              statuses={character.statuses}
            />
          })}
        </div>
        <EncounterMenu
          open={this.state.encounterMenuOpen}
          onDismiss={() => this.setState({ encounterMenuOpen: false })}
          onAddEncounter={() => this.setState({ newEncounterModalOpen: true })}
          onAddPlayer={() => this.setState({ newPlayerModalOpen: true })}
          onAddMonster={() => this.setState({ newMonsterModalOpen: true })}
          onEncounterSelect={() => {}}
          onPlayerSelect={() => {}}
          onMonsterSelect={() => {}}
          encounters={encounters}
          encountersDefinitions={encountersDefinitions}
          players={players}
          playersDefinitions={playersDefinitions}
          monsters={monsters}
          monstersDefinitions={monstersDefinitions}
        />
        <ProfileMenu
          open={this.state.profileMenuOpen}
          onDismiss={() => this.setState({ profileMenuOpen: false })}
        />
        <CreateEncounterModal
          active={this.state.newEncounterModalOpen}
          onDismiss={() => this.setState({ newEncounterModalOpen: false })}
          onCreateEncounter={this.handleAddEncounter}
          onCreateMonster={this.handleAddMonster}
          monsters={monsters}
          monstersDefinitions={monstersDefinitions}
        />
        <CreatePlayerModal
          active={this.state.newPlayerModalOpen}
          onDismiss={() => this.setState({ newPlayerModalOpen: false })}
          onCreate={this.handleAddPlayer}
        />
        <CreateMonsterModal
          active={this.state.newMonsterModalOpen}
          onDismiss={() => this.setState({ newMonsterModalOpen: false })}
          onCreate={this.handleAddMonster}
        />
      </div>
    )
  }
}
