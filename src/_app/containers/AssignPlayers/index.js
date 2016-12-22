import React, { Component, PropTypes } from 'react';
import Popup from '../../components/Popup/Popup';
import CreatePlayerModal from '../PlayerModals/create';

import './AssignPlayers.less';

export default class AssignPlayers extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onPlayersAssign: PropTypes.func.isRequired,
    encounterDefinition: PropTypes.object,
    players: PropTypes.array.isRequired,
    playersDefinitions: PropTypes.object.isRequired,
    onPlayerCreate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      createPlayer: false,
      selectAll: true,
      selectedPlayers: {},
    };

    this.handleCreatePlayer = this.handleCreatePlayer.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.toggleSelectAll = this.toggleSelectAll.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  handleCreatePlayer(name) {
    this.props.onPlayerCreate(name);
    this.setState({ createPlayer: false });
  }

  handleCreate() {
    const { encounterDefinition } = this.props;
    const players = Object
      .keys(this.state.selectedPlayers)
      .filter(id => this.state.selectedPlayers[id]);

    if (players.length === 0) return;

    this.props.onPlayersAssign(encounterDefinition.id, players);
    this.setState({ selectedPlayers: {} });
  }

  toggleSelectAll() {
    const { selectAll } = this.state;
    const { players } = this.props;

    const allPlayers = players.reduce((agg, id) => {
      agg[id] = true;
      return agg;
    }, {});

    return selectAll
      ? this.setState({ selectAll: false, selectedPlayers: allPlayers })
      : this.setState({ selectAll: true, selectedPlayers: {}});
  }

  toggleSelected(id) {
    const { selectedPlayers } = this.state;
    let newPlayers;
    if (selectedPlayers[id]) {
      newPlayers = {
        ...selectedPlayers,
        [id]: null,
      };
    } else {
      newPlayers = {
        ...selectedPlayers,
        [id]: true,
      }
    }

    const numSelected = Object.keys(newPlayers).filter(id => newPlayers[id]).length;

    this.setState({ selectedPlayers: newPlayers, selectAll: numSelected === 0 });
  }

  handleDismiss() {
    this.setState({ selectAll: true, selectedPlayers: {} });
    this.props.onDismiss();
  }

  render() {
    const {
      encounterDefinition,
      players,
      playersDefinitions,
    } = this.props;

    const {
      selectedPlayers,
      selectAll,
    } = this.state;

    return <Popup
      id='assign-players'
      active={this.props.active}
      onDismiss={this.props.onDismiss}
      direction='bottom'
    >
      <div className='assign-players'>
        <div className='assign-players-header'>
          <h3>Add players</h3>
          <p className='subtext'>{encounterDefinition.name}</p>
        </div>
        <div className='assign-players-body create-encounter'>
          <button onClick={this.toggleSelectAll} className='btn btn-primary'
          >{selectAll ? 'Select All': 'Deselect All'}</button>
          <div className='create-encounter-tiles'>
            {players.map(id => (
              <div
                key={playersDefinitions[id].id}
                className={`create-encounter-tile${selectedPlayers[id] ? ' selected' : ''}`}
                onClick={() => this.toggleSelected(id)}
              >
                <p className='create-encounter-tile-initials'>{playersDefinitions[id].name.slice(0, 2)}</p>
                <p className='create-encounter-tile-name'>{playersDefinitions[id].name}</p>
              </div>
            ))}
            <div className='create-encounter-tile' onClick={() => this.setState({ createPlayer: true })}>
              <p className='create-encounter-tile-initials'>&#43;</p>
              <p className='create-encounter-tile-name'>Create Player</p>
            </div>
          </div>
        </div>
        <div className='assign-players-footer modal-footer'>
          <button onClick={this.handleCreate} className='modal-btn modal-btn-ok'><span className='fa fa-check'/> Next</button>
          <button onClick={this.handleDismiss} className='modal-btn modal-btn-del'><span className='fa fa-remove'/> Cancel</button>
        </div>
      </div>
      <CreatePlayerModal
        active={this.state.createPlayer}
        onDismiss={() => this.setState({ createPlayer: false })}
        onCreate={this.handleCreatePlayer}
      />
    </Popup>
  }
}
