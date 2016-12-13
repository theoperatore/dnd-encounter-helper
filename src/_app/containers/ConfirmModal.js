import React, { Component, PropTypes } from 'react';
import Modal from '../components/Modal/Modal';

export default class ConfirmModal extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onConfirm: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
  }

  handleYes() {
    this.props.onConfirm('yes');
  }

  handleNo() {
    this.props.onConfirm('no');
  }

  render() {
    return <Modal
      id='confirm-modal'
      active={this.props.active}
      onDismiss={() => {}}
    >
      <div className='modal'>
        <div className='modal-header'>
          <h3>Are you sure?</h3>
        </div>
        <div className='modal-body'>
          <p>Cancel and lose any unsaved input?</p>
        </div>
        <div className='modal-footer'>
          <button onClick={this.handleYes} className='modal-btn'>Yes</button>
          <button onClick={this.handleNo} className='modal-btn'>No</button>
        </div>
      </div>
    </Modal>
  }
}
