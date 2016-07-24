'use strict';

import React, { PropTypes } from 'react';
import cn from 'classnames';
import ConfirmModal from './components/ConfirmModal';
import EditCharacter from './EditCharacter';

export default class Character extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    initiative: PropTypes.number.isRequired,
    hp: PropTypes.number,
    current: PropTypes.number,
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    onRemove: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onHpUp: PropTypes.func.isRequired,
    onHpDown: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      remove: false,
      edit: false,
    };
  }

  handleConfirm(answer) {
    if (answer === 'yes') {
      this.props.onRemove(this.props.id);
    }

    this.setState({ remove: false });
  }

  startRemove() {
    this.setState({ remove: true });
  }

  handleEdit(newValues) {
    this.props.onEdit(newValues);
  }

  renderHP() {
    const {
      id,
      hp,
      current,
      onHpDown,
      onHpUp,
    } = this.props;

    const width = (current / hp) * 100;

    const classes = cn({
      'bg-green': width >= 75,
      'bg-yellow': width < 75 && 25,
      'bg-red': width < 25,
    });

    return <div className='overflow-hidden'>
      <p
        className='m0 p0 muted'
      >{current} / {hp} {current < (hp / 2) ? <span className='orange'>bloodied</span> : ''}</p>
      <span
        className={classes}
        style={{
          display: 'block',
          height: '1px',
          width: '100%',
          transform: `translateX(${width - 100}%)`,
          marginTop: '5px',
          transition: 'transform 300ms ease',
        }}
      >
      </span>
      <span
        onClick={onHpDown.bind(this, id)}
        className='fa fa-arrow-down p1 hp-down mr1'
      />
      <span
        onClick={onHpUp.bind(this, id)}
        className='fa fa-arrow-up p1 hp-up'
      />
    </div>
  }

  render() {
    const {
      name,
      initiative,
      hp,
      current,
      id,
      active,
    } = this.props;

    const itmCn = cn({
      'm0': true,
      'p0': true,
      'character-container': true,
      'flex': true,
      'items-center': true,
      'selected': active,
      'transition-background': true,
    });

    return (
      <div className={itmCn}>
        <div
          className='m0 p2 flex-auto character-info flex items-center'
        >
          <div
            className='interactable'
            onClick={() => this.setState({ edit: true })}
          >
            <h1
              className='m0 mr1 p0'
            >{name}</h1>
            <span className='block fa fa-pencil'></span>
          </div>
          <div className='flex-auto'>
            <p className='m0 p0 muted'>@ {initiative} initiative</p>
            {
              hp
              ? this.renderHP()
              : null
            }
          </div>
        </div>
        <span
          className='p2 fa fa-remove red content-end character-remove interactable'
          onClick={::this.startRemove}
        >
        </span>
        <ConfirmModal
          active={this.state.remove}
          message=''
          onConfirm={::this.handleConfirm}
        />
        <EditCharacter
          active={this.state.edit}
          id={id}
          name={name}
          hp={hp}
          initiative={initiative}
          current={current}
          onDismiss={() => this.setState({ edit: false })}
          onEdit={::this.handleEdit}
        />
      </div>
    )
  }
}
