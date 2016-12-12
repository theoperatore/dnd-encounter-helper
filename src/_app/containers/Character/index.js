import React, { Component, PropTypes } from 'react';
import './Character.less';

const statuses = [
  'psn',
  'prz',
  'slp',
  'brn',
  'prn',
  'unc',
  'dth',
];

export default class Character extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    initiative: PropTypes.number.isRequired,
  }

  render() {
    const {
      name,
      initiative,
    } = this.props;

    return <div className='character'>
      <div className='character-section'>
        <h1 className='character-section-initiative'>{initiative}</h1>
        {/* <p className='character-section-subtitle'>init</p> */}
      </div>
      <div className='character-section'>
        <p className='character-section-name'>{name}</p>
        {/* <div className='character-section-damage'>
          <p>{100} dmg taken</p>
        </div> */}
        <div className='character-section-statuses'>
          {statuses.map((status, idx) => (
            <span key={idx} className='character-section-status'>{status}</span>
          ))}
        </div>
        {/* <div className='character-section-dmg-tokens'>
          {tokens.map(token => (
            <span key={token} className='character-section-token'>{token}</span>
          ))}
          {actions.map(action => (
            <span key={action} className='character-section-token'>{action}</span>
          ))}
        </div> */}
      </div>
    </div>
  }
}
