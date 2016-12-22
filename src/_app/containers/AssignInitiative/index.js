import React, { Component, PropTypes } from 'react';
import Popup from '../../components/Popup/Popup';

import './AssignInitiative.less';

const initiatives = new Array(50)
  .fill(0)
  .map((z, idx) => (<option key={idx} value={idx + 1}>{idx + 1}</option>));

export default class AssignInitiative extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    encounterDefinition: PropTypes.object.isRequired,
    monstersDefinitions: PropTypes.object.isRequired,
    playersDefinitions: PropTypes.object.isRequired,
    onInitiativesAssigned: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleStartEncounter = this.handleStartEncounter.bind(this);
    this.selects = {};
  }

  handleStartEncounter() {
    let foundInvalid = false;
    const inits = Object
      .keys(this.selects)
      .reduce((agg, uri) => {
        const value = Number(this.selects[uri].value);
        agg[uri] = value;

        if (value === -1) foundInvalid = true;

        return agg;
      }, {});

    if (foundInvalid) return;

    this.props.onInitiativesAssigned(this.props.encounterDefinition.id, inits);
  }

  renderMonsters() {
    const {
      encounterDefinition: {
        monsters = [],
      },
      monstersDefinitions,
    } = this.props;

    const seenDupes = {};

    return monsters.map((monsterId, idx) => {
      const monster = monstersDefinitions[monsterId];
      const dupeCount = (seenDupes[monsterId] || 1);
      const monsterName = `${monster.name} ${dupeCount}`;

      seenDupes[monsterId] = (seenDupes[monsterId] || 1) + 1;

      return <div className='list-item' key={`m-${monster.id}-${idx}`}>
        <label htmlFor={`m-${monster.id}-${idx}`} className='input-label'>{monsterName}</label>
        <select
          id={`m-${monster.id}-${idx}`}
          className='input'
          ref={ref => this.selects[`${monster.id}:${dupeCount}`] = ref}
          defaultValue={-1}
        >
          <option disabled value={-1}>Select initiative...</option>
          {initiatives}
        </select>
      </div>
    });
  }

  render() {
    const {
      encounterDefinition: {
        players = [],
      },
      playersDefinitions,
    } = this.props;

    return <Popup
      id='assign-initiative'
      active={this.props.active}
      direction='bottom'
      onDismiss={this.props.onDismiss}
    >
      <div className='assign-initiative'>
        <div className='assign-initiative-header'>
          <h3>Initiative</h3>
        </div>
        <div className='assign-initiative-body'>
          {this.renderMonsters()}
          {players.map((playerId, idx) => {
            const player = playersDefinitions[playerId];

            return <div className='list-item' key={player.id}>
              <label htmlFor={`p-${player.id}`} className='input-label'>{player.name}</label>
              <select
                id={`p-${player.id}`}
                className='input'
                defaultValue={-1}
                ref={ref => this.selects[player.id] = ref}
              >
                <option disabled value={-1}>Select initiative...</option>
                {initiatives}
              </select>
            </div>
          })}
        </div>
        <div className='assign-initiative-footer modal-footer'>
          <button onClick={this.handleStartEncounter} className='modal-btn modal-btn-ok'><span className='fa fa-check'/> Start</button>
          <button onClick={this.props.onDismiss} className='modal-btn modal-btn-del'><span className='fa fa-remove'/> Cancel</button>
        </div>
      </div>
    </Popup>
  }
}
