'use strict';

import React, { PropTypes } from 'react';
import uuid from 'node-uuid';
import Modal from './components/Modal';

export default class AddToInitiative extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.nameInput = null;
    this.initInput = null;
    this.hpInput = null;

    this.state = {
      disabled: true,
    };
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

    this.setState({ disabled: false });
    return true;
  }

  handleSubmit() {
    const {
      init,
      hpValue,
      hp,
      name
    } = this.getValues();

    if (this.validate()) {
      this.props.onAdd({
        init,
        hp: hpValue === '' ? null : hp,
        name,
        id: uuid.v1(),
      });
      this.setState({ disabled: true });
      this.props.onDismiss();
    }
  }

  renderContent() {
    return <section className='bg-dark white'>
      <div className='p1'>
        <label htmlFor='name-input'>Name</label>
        <input
          id='name-input'
          type='text'
          onChange={::this.validate}
          ref={ref => this.nameInput = ref}
        />
        <label htmlFor='init-input'>Initiative (number)</label>
        <input
          id='init-input'
          type='number'
          onChange={::this.validate}
          ref={ref => this.initInput = ref}
        />
        <label htmlFor='hp-input'>Hit Points (number)</label>
        <input
          id='hp-input'
          type='number'
          onChange={::this.validate}
          ref={ref => this.hpInput = ref}
        />
      </div>
      <div className='modal-footer'>
        <button
          className='green'
          onClick={::this.handleSubmit}
          disabled={this.state.disabled}
        >
          <span className='fa fa-plus mr1'></span>
          Add
        </button>
        <button
          className='red'
          onClick={this.props.onDismiss}
        >
          <span className='fa fa-remove mr1'></span>
          Cancel
        </button>
      </div>
    </section>
  }

  render() {
    return <Modal
      id='craete-new-character'
      active={this.props.active}
      content={this.renderContent()}
      onDismiss={this.props.onDismiss}
    />
  }
}
