'use strict';

import React, { PropTypes } from 'react';
import Character from './Character';
import AddToInitiative from './AddToInitiative';

export default class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      add: false,
    }
  }

  handleCharacterAdded(action) {
    let a = Object.assign({
      type: 'CHARACTER_ADDED'
    }, action);

    this.props.dispatch(a);
  }

  handleCharacterRemoved(id) {
    this.props.dispatch({
      type: 'CHARACTER_REMOVED',
      id,
    });
  }

  handleCharacterEdit(newValues) {
    this.props.dispatch(Object.assign({
      type: 'CHARACTER_EDIT',
    }, newValues));
  }

  handleCharacterHpUp(id) {
    this.props.dispatch({
      type: 'HP_INCREMENT',
      id,
    });
  }

  handleCharacterHpDown(id) {
    this.props.dispatch({
      type: 'HP_DECREMENT',
      id,
    });
  }

  handleClear() {
    this.props.dispatch({ type: 'CLEAR' });
  }

  handleStop() {
    this.props.dispatch({ type: 'STOP' });
  }

  handleStart() {
    const { characters } = this.props.state;
    const id = characters[0].id || null;
    this.props.dispatch({ type: 'START', id });
  }

  handleNext() {
    const { characters, flags: { activeCharacter } } = this.props.state;
    const idx = characters.findIndex(c => c.id === activeCharacter);

    const nextId = idx + 1 > characters.length - 1
      ? characters[0].id
      : characters[idx + 1].id;

    this.props.dispatch({ type: 'NEXT', id: nextId });
  }

  renderCharacters() {
    const { characters, flags: { activeCharacter } } = this.props.state;

    return characters.map((character, idx) => {
      return <Character
        key={idx}
        active={activeCharacter === character.id}
        name={character.name}
        initiative={character.initiative}
        id={character.id}
        hp={character.hp}
        current={character.current}
        onRemove={::this.handleCharacterRemoved}
        onEdit={::this.handleCharacterEdit}
        onHpUp={::this.handleCharacterHpUp}
        onHpDown={::this.handleCharacterHpDown}
      />
    });
  }

  render() {
    let { characters, flags: { hasStarted } } = this.props.state;

    return <section className='flex flex-column overflow-hidden'>
      <div className='flex-auto overflow-auto m0 p0 flow-scroll'>
        { this.renderCharacters() }
      </div>
      <footer className='p0 m0 content-end cf flex'>
        <div
          className='action-btn bg-blue white flex-auto'
          onClick={() => this.setState({ add: true })}
        >
          <span className='p1'>Add</span>
        </div>
        <div
          className='action-btn bg-olive white flex-auto'
          onClick={hasStarted ? ::this.handleNext : ::this.handleStart}
        >
          <span
            className='p1'
          >{
            hasStarted
            ? 'Next'
            : 'Start'
          }</span>
        </div>
        <div
          className='action-btn bg-maroon white flex-auto'
          onClick={hasStarted ? ::this.handleStop : ::this.handleClear}
        >
          <span
            className='p1'
          >{
            hasStarted
            ? 'Stop'
            : 'Clear'
          }</span>
        </div>
      </footer>
      <AddToInitiative
        active={this.state.add}
        onDismiss={() => this.setState({ add: false })}
        onAdd={::this.handleCharacterAdded}
      />
    </section>
  }
}
