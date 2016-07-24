'use strict';

import React, { PropTypes, Component } from 'react';
import Modal from './components/Modal';
import ConfirmModal from './components/ConfirmModal';

export default class EditCharacter extends Component {
  constructor(props) {
    super(props);

    this.nameInput = null;
    this.initInput = null;
    this.hpInput = null;

    this.state = {
      disabled: true,
      dirty: false,
      confirm: false,
    };
  }

  handleCancel() {
    if (this.state.dirty) {
      this.setState({ confirm: true });
    } else {
      this.props.onDismiss();
    }
  }

  handleConfirm(answer) {
    if (answer === 'yes') {
      this.setState({ disabled: true, dirty: false, confirm: false });
      this.props.onDismiss();
      return;
    }

    this.setState({ confirm: false });
  }

  handleSubmit() {
    if (!this.validate()) return;

    const {
      init,
      hp,
      name,
    } = this.getValues();

    const {
      id,
      onEdit,
    } = this.props;

    onEdit({
      id,
      init,
      hp,
      name,
    });

    this.setState({ disabled: true, dirty: false, confirm: false });
    this.props.onDismiss();
  }

  getValues() {
    return {
      init: Number(this.initInput.value.trim()),
      hpValue: this.hpInput.value.trim(),
      hp: Number(this.hpInput.value.trim()),
      name: this.nameInput.value.trim(),
    };
  }

  validate() {
    const {
      init,
      hpValue,
      hp,
      name
    } = this.getValues();

    // if init is NaN, false
    if (isNaN(init) || init === 0) {
      this.setState({ disabled: true });
      return false;
    }

    // if hp has a value, but that value is NaN, false
    if (hpValue !== '' && isNaN(hp)) {
      this.setState({ disabled: true });
      return false;
    }

    if (name === '') {
      this.setState({ disabled: true });
      return false;
    }

    this.setState({ disabled: false, dirty: true });
    return true;
  }

  getContent() {
    const {
      name,
      initiative,
      hp,
    } = this.props;

    return <section className='bg-dark white'>
      <div className='p1'>
        <label htmlFor='name-input'>Name</label>
        <input
          id='name-input'
          type='text'
          onChange={::this.validate}
          ref={ref => this.nameInput = ref}
          defaultValue={name}
        />
        <label htmlFor='init-input'>Initiative (number)</label>
        <input
          id='init-input'
          type='number'
          onChange={::this.validate}
          ref={ref => this.initInput = ref}
          defaultValue={initiative}
        />
        <label htmlFor='hp-input'>Hit Points (number)</label>
        <input
          id='hp-input'
          type='number'
          onChange={::this.validate}
          ref={ref => this.hpInput = ref}
          defaultValue={hp}
        />
      </div>
      <div className='modal-footer'>
        <button
          className='green'
          disabled={this.state.disabled}
          onClick={::this.handleSubmit}
        ><span className='fa fa-pencil' /> Save</button>
        <button
          className='red'
          onClick={::this.handleCancel}
        ><span className='fa fa-remove' /> Cancel</button>
      </div>
      <ConfirmModal
        onConfirm={::this.handleConfirm}
      />
    </section>
  }

  render() {
    const {
      id,
      active,
    } = this.props;

    return <Modal
      id={`edit-${id}`}
      active={active}
      content={this.getContent()}
      onDismiss={::this.handleCancel}
    />
  }
}
