import React, { Component, PropTypes } from 'react';
import Navbar from './components/Navbar/Navbar';

import EncounterMenu from './containers/EncounterMenu';
import ProfileMenu from './containers/ProfileMenu';
import Character from './containers/Character';
import CreateEncounterModal from './containers/EncounterModals/create';
import CreatePlayerModal from './containers/PlayerModals/create';
import CreateMonsterModal from './containers/MonsterModals/create';
import AssignPlayers from './containers/AssignPlayers';
import AssignInitiative from './containers/AssignInitiative';

import { addPlayer } from '../state/players/actions';
import { addMonster } from '../state/monsters/actions';
import { addEncounter, addPlayersToEncounter } from '../state/encounters/actions';
import { selectEncounter, startEncounter } from '../state/encounter/actions';

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
      assignPlayersOpen: false,
      assignInitiativeOpen: false,
    };

    this.handleAddEncounter = this.handleAddEncounter.bind(this);
    this.handleAddPlayer = this.handleAddPlayer.bind(this);
    this.handleAddMonster = this.handleAddMonster.bind(this);
    this.handleSelectEncounter = this.handleSelectEncounter.bind(this);
    this.handlePlayersAssign = this.handlePlayersAssign.bind(this);
    this.handleInitiativesAssigned = this.handleInitiativesAssigned.bind(this);
  }

  handleAddEncounter(name, monsters) {
    this.props.dispatch(addEncounter(name, monsters));
    this.setState({ newEncounterModalOpen: false });
  }

  handleAddPlayer(newPlayerName) {
    this.props.dispatch(addPlayer(newPlayerName));
    this.setState({ newPlayerModalOpen: false });
  }

  handleAddMonster(newMonsterName) {
    this.props.dispatch(addMonster(newMonsterName));
    this.setState({ newMonsterModalOpen: false });
  }

  handleSelectEncounter(id) {
    this.props.dispatch(selectEncounter(id));
    this.setState({ encounterMenuOpen: false, assignPlayersOpen: true });
  }

  handlePlayersAssign(id, players) {
    this.props.dispatch(addPlayersToEncounter(id, players));
    this.setState({ assignPlayersOpen: false, assignInitiativeOpen: true });
  }

  handleInitiativesAssigned(encounterId, combatantsToInitatives) {
    this.props.dispatch(startEncounter(encounterId, combatantsToInitatives));
    this.setState({ assignInitiativeOpen: false });
  }

  render() {
    const {
      encounter,
      encounters,
      encountersDefinitions,
      monsters,
      monstersDefinitions,
      players,
      playersDefinitions,
    } = this.props.state;

    const selectedEncounter = encountersDefinitions[encounter.selectedEncounter];
    const hasEncounterSelected = !!selectedEncounter;

    const encounterTitle = selectedEncounter
      ? selectedEncounter.name
      : '';


    return (
      <div className="app">
        <Navbar
          title={encounterTitle}
          onLeftMenuClick={() => this.setState({ encounterMenuOpen: true })}
          onRightMenuClick={() => this.setState({ profileMenuOpen: true })}
        />
        <div className='app-content'>
          {!hasEncounterSelected && (
            <div>
              <p className='app-subtext'>No encounter selected...</p>
              {/* <button className='app-subtext-btn app-subtext-btn-ok'><span className='fa fa-check'></span> Complete</button> */}
              {/* <button className='app-subtext-btn app-subtext-btn-del'><span className='fa fa-remove'></span> Delete</button> */}
            </div>
          )}
          {encounter.order.map(participant => {
            const parts = participant.uri.split(':');
            const [id, dupeCount] = parts;

            const pDef = playersDefinitions[id];
            const mDef = monstersDefinitions[id];

            const isPlayer = !!pDef;

            const name = isPlayer
              ? pDef.name
              : `${mDef.name} ${dupeCount}`;

            return <Character
              key={participant.uri}
              id={participant.uri}
              name={name}
              initiative={participant.init}
              statuses={participant.statuses}
            />
          })}
        </div>
        <EncounterMenu
          open={this.state.encounterMenuOpen}
          onDismiss={() => this.setState({ encounterMenuOpen: false })}
          onAddEncounter={() => this.setState({ newEncounterModalOpen: true })}
          onAddPlayer={() => this.setState({ newPlayerModalOpen: true })}
          onAddMonster={() => this.setState({ newMonsterModalOpen: true })}
          onEncounterSelect={this.handleSelectEncounter}
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
        <AssignPlayers
          active={this.state.assignPlayersOpen}
          onDismiss={() => this.setState({ assignPlayersOpen: false })}
          onPlayersAssign={this.handlePlayersAssign}
          encounterDefinition={encountersDefinitions[encounter.startEncounterId] || {}}
          players={players}
          playersDefinitions={playersDefinitions}
          onPlayerCreate={this.handleAddPlayer}
        />
        <AssignInitiative
          active={this.state.assignInitiativeOpen}
          onDismiss={() => this.setState({ assignInitiativeOpen: false })}
          encounterDefinition={encountersDefinitions[encounter.startEncounterId] || {}}
          playersDefinitions={playersDefinitions}
          monstersDefinitions={monstersDefinitions}
          onInitiativesAssigned={this.handleInitiativesAssigned}
        />
      </div>
    )
  }
}
