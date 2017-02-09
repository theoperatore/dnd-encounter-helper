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

import { selectEncounter, assignPlayersToEncounter, startEncounter, clearEncounter } from '../state/currentEncounter/actions';
import { addPlayer } from '../state/players/actions';
import { addMonster } from '../state/monsters/actions';
import { addEncounter } from '../state/encounters/actions';

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
    const { encountersDefinitions, monstersDefinitions } = this.props.state;
    this.props.dispatch(selectEncounter(id, encountersDefinitions, monstersDefinitions));
    this.setState({ encounterMenuOpen: false, assignPlayersOpen: true });
  }

  handlePlayersAssign(id, players) {
    const { playersDefinitions } = this.props.state;
    this.props.dispatch(assignPlayersToEncounter(players, playersDefinitions));
    this.setState({ assignPlayersOpen: false, assignInitiativeOpen: true });
  }

  handleInitiativesAssigned(combatantsToInitatives) {
    this.props.dispatch(startEncounter(combatantsToInitatives));
    this.setState({ assignInitiativeOpen: false });
  }

  render() {
    const {
      currentEncounter,
      encounters,
      encountersDefinitions,
      monsters,
      monstersDefinitions,
      players,
      playersDefinitions,
    } = this.props.state;

    const selectedEncounter = encountersDefinitions[currentEncounter.id];
    const hasEncounterSelected = selectedEncounter !== undefined && currentEncounter.order && currentEncounter.order.length > 0;

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
          {hasEncounterSelected && currentEncounter.order.map(participant => {
            const partsIfMonster = participant.id.split(':');
            const isMonster = participant.type === 'monster' && partsIfMonster.length > 1;
            const id = partsIfMonster[0];
            const name = isMonster
              ? `${monstersDefinitions[id].name} ${partsIfMonster[1]}`
              : playersDefinitions[id].name;

            const damage = isMonster
              ? currentEncounter.monstersDefinitions[id].damage
              : currentEncounter.playersDefinitions[id].damage;

            return <Character
              key={participant.id}
              id={id}
              name={name}
              damage={damage}
            />
          })}
        </div>
        <div className='app-actions'>
          {/* <button className='app-actions-btn'><span className='fa fa-edit'/><span className='action-subtext'>Options</span></button> */}
          <button className='app-actions-btn'><span className='fa fa-share'/><span className='action-subtext'>Start</span></button>
          <button className='app-actions-btn' onClick={() => this.props.dispatch(clearEncounter())}><span className='fa fa-remove'/><span className='action-subtext'>Clear</span></button>
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
          encounterDefinition={encountersDefinitions[currentEncounter.id] || {}}
          players={players}
          playersDefinitions={playersDefinitions}
          onPlayerCreate={this.handleAddPlayer}
        />
        <AssignInitiative
          active={this.state.assignInitiativeOpen}
          onDismiss={() => this.setState({ assignInitiativeOpen: false })}
          currentEncounter={currentEncounter}
          onInitiativesAssigned={this.handleInitiativesAssigned}
        />
      </div>
    )
  }
}
