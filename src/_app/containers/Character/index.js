import React, { Component, PropTypes } from 'react';
import './Character.less';

export default class Character extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    damage: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      testDamage: 0,
    };
  }

  testDamage(ev) {
    const dmg = Number(ev.target.value);
    this.setState({ testDamage: dmg });
  }

  testAdd() {
    const { testDamage } = this.state;
    this.setState({ testDamage: testDamage + 1 > 100 ? 100: testDamage + 1 });
  }

  testMinus() {
    const { testDamage } = this.state;
    this.setState({ testDamage: testDamage - 1 < 0 ? 0: testDamage - 1 });
  }

  render() {
    const {
      name,
      damage,
    } = this.props;

    return <div className='character'>
      <div className='character-section'>
        <h1 className='character-section-initiative'>{this.state.testDamage}</h1>
        <p className='character-section-subtitle'>dmg taken</p>
      </div>
      <div className='character-section'>
        <p className='character-section-name'>{name}</p>
        <div className='character-section-damage'>
          <span className='fa fa-minus' onClick={() => this.testMinus()}></span>
          <input type='range' min={0} max={300} step={1} value={this.state.testDamage} onChange={ev => this.testDamage(ev)}/>
          <span className='fa fa-plus' onClick={() => this.testAdd()}></span>
        </div>
      </div>
    </div>
  }
}
