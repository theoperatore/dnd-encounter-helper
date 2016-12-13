import React, { Component, PropTypes } from 'react';
import Modal from '../../components/Modal/Modal';
import ConfirmModal from '../ConfirmModal';

export default class CreatePlayerModal extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      dirty: false,
      confirm: false,
    };

    this.characterName = null;
    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleCreate() {
    const name = this.characterName && this.characterName.value.trim();
    
    if (!name) return;

    this.setState({ dirty: false });
    this.props.onCreate(name);
  }

  handleDismiss() {
    if (this.state.dirty) {
      return this.setState({ confirm: true });
    }

    return this.props.onDismiss();
  }

  handleConfirm(answer) {
    switch (answer) {
      case 'yes':
        return this.setState({ confirm: false, dirty: false}, this.props.onDismiss);
      case 'no':
      default:
        return this.setState({ confirm: false });
    }
  }

  render() {
    return <Modal
      id='create-new-player'
      active={this.props.active}
      onDismiss={this.handleDismiss}
    >
      <div className='modal'>
        <div className='modal-header'>
          <h3>Add player</h3>
        </div>
        <div className='modal-body'>
          <input
            ref={ref => this.characterName = ref}
            id='new-character-input'
            className='modal-input'
            type='text'
            placeholder='player name...'
            onChange={() => this.setState({ dirty: true })}
          />
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleCreate} className='modal-btn modal-btn-ok'><span className='fa fa-save'></span> Add</button>
          <button onClick={this.handleDismiss} className='modal-btn modal-btn-del'><span className='fa fa-remove'></span> Cancel</button>
        </div>
      </div>
      <ConfirmModal active={this.state.confirm} onConfirm={this.handleConfirm} />
    </Modal>

  }
}
