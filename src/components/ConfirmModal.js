'use strict';

import React, { PropTypes } from 'react';
import Modal from './Modal';

export default class ConfirmModal extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
  }

  static defaultProps = {
    message: 'Anything unsaved will be lost.',
    active: false,
  }

  constructor(props) {
    super(props);
  }

  handleConfirm(answer) {
    this.props.onConfirm(answer);
  }

  getConfirmContent() {
    return <section className='bg-dark white'>
      <div className='p2'>
        <h3 className='m0 p0'>Are you sure?</h3>
      </div>
      <div className='p2'>
        <p className='m0 p0'>{this.props.message}</p>
      </div>
      <div className='modal-footer'>
        <button onClick={this.handleConfirm.bind(this, 'yes')} className='green'>Yes</button>
        <button onClick={this.handleConfirm.bind(this, 'no')} className='red'>No</button>
      </div>
    </section>
  }

  render() {
    return <Modal
      id='confirm-modal'
      active={this.props.active}
      content={this.getConfirmContent()}
      onDismiss={this.handleConfirm.bind(this, 'no')}
    />
  }
}
