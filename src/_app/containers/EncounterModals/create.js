import React, { Component, PropTypes } from 'react';

import Modal from '../../components/Modal/Modal';
import ConfirmModal from '../ConfirmModal';
import CreateMonsterModal from '../MonsterModals/create';

import './EncounterModals.less';

export default class CreateEncounterModal extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onCreateEncounter: PropTypes.func.isRequired,
    onCreateMonster: PropTypes.func.isRequired,
    monstersDefinitions: PropTypes.object.isRequired,
    monsters: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
      confirm: false,
      createMonster: false,
      queued: [],
    }

    this.encounterName = null;
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleAddMonster = this.handleAddMonster.bind(this);
  }

  handleDismiss() {
    if (this.state.dirty) return this.setState({ confirm: true });

    this.setState({ queued: [] });
    this.props.onDismiss();
  }

  handleCreate() {
    const name = this.encounterName && this.encounterName.value.trim();

    if (!name || this.state.queued.length === 0) return;
    const monsters = this.state.queued.reduce((agg, q) => {
      const items = new Array(q.count)
        .fill(1)
        .map(i => q.id);

      return agg.concat(items);
    }, []);

    this.props.onCreateEncounter(name, monsters);
    this.setState({ queued: [], dirty: false });
    this.props.onDismiss();
  }

  handleConfirm(answer) {
    switch (answer) {
      case 'yes': {
        this.setState({ dirty: false, confirm: false, queued: [] });
        return this.props.onDismiss();
      }
      case 'no':
      default: {
        return this.setState({ confirm: false });
      }
    }
  }

  queueMonster(monster) {
    const idx = this.state.queued.findIndex(q => q.id === monster.id);

    if (idx === -1) {
      return this.setState({ queued: [
        ...this.state.queued,
        {
          ...monster,
          count: 1,
        },
      ], dirty: true });
    }

    const newQueued = [
      ...this.state.queued.slice(0, idx),
      {
        ...this.state.queued[idx],
        count: this.state.queued[idx].count + 1,
      },
      ...this.state.queued.slice(idx + 1),
    ];

    this.setState({ queued: newQueued, dirty: true });
  }

  handleRemoveFromQueue(idx) {
    const original = this.state.queued[idx];

    if (original.count - 1 === 0) {
      const newQueued = this.state.queued.filter((q, i) => i !== idx);
      return this.setState({ queued: newQueued });
    }

    const newQueued = [
      ...this.state.queued.slice(0, idx),
      {
        ...this.state.queued[idx],
        count: this.state.queued[idx].count - 1,
      },
      ...this.state.queued.slice(idx + 1),
    ];

    this.setState({ queued: newQueued });
  }

  // TODO: this might turn into a promise...
  // basically, we need to know if the async save
  // was successful
  handleAddMonster(name) {
    this.props.onCreateMonster(name);
    this.setState({ createMonster: false });
  }

  render() {
    const {
      active,
      monsters,
      monstersDefinitions,
    } = this.props;

    const {
      queued,
    } = this.state;

    return <Modal
      id='create-encounter'
      active={active}
      onDismiss={this.handleDismiss}
    >
      <div className='modal'>
        <div className='modal-header'>
          <h3>Create encounter</h3>
        </div>
        <div className='modal-body create-encounter'>
          {/* <p className='help-text'>Select a monster one or more times to add it to this encounter one or more times.</p> */}
          <input
            ref={r => this.encounterName = r}
            onChange={() => this.setState({ dirty: true })}
            type='text'
            className='modal-input'
            placeholder='encounter name...'
          />
          <div className='create-encounter-tiles'>
            {monsters.map(id => (
              <div
                key={monstersDefinitions[id].id}
                className='create-encounter-tile'
                onClick={() => this.queueMonster(monstersDefinitions[id])}
              >
                <p className='create-encounter-tile-initials'>{monstersDefinitions[id].name.slice(0, 2)}</p>
                <p className='create-encounter-tile-name'>{monstersDefinitions[id].name}</p>
              </div>
            ))}
            <div className='create-encounter-tile' onClick={() => this.setState({ createMonster: true })}>
              <p className='create-encounter-tile-initials'>&#43;</p>
              <p className='create-encounter-tile-name'>Create Monster</p>
            </div>
          </div>
          <div className='create-encounter-selected'>
            {queued.map((mon, idx) => (
              <p
                key={idx}
                className='create-encounter-selected-name'
                onClick={() => this.handleRemoveFromQueue(idx)}
              >{mon.name} <span className='create-encounter-selected-count'>({mon.count}) </span><span className='create-encounter-selected-remove fa fa-remove'></span></p>
            ))}
          </div>
        </div>
        <div className='modal-footer'>
          <button
            onClick={this.handleCreate}
            className='modal-btn modal-btn-ok'
          ><span className='fa fa-save'></span> Add</button>
          <button onClick={this.handleDismiss} className='modal-btn modal-btn-del'><span className='fa fa-remove'></span> Cancel</button>
        </div>
      </div>
      <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm} />
      <CreateMonsterModal
        active={this.state.createMonster}
        onDismiss={() => this.setState({ createMonster: false })}
        onCreate={this.handleAddMonster}
      />
    </Modal>
  }
}
