import React, { Component, PropTypes } from 'react';

import Drawer from '../../components/Drawer/Drawer';
import EncounterMenuContent from './EncounterMenuContent';

export default class EncounterMenu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
    onAddEncounter: PropTypes.func.isRequired,
    onAddPlayer: PropTypes.func.isRequired,
    onAddMonster: PropTypes.func.isRequired,
    onEncounterSelect: PropTypes.func.isRequired,
    onPlayerSelect: PropTypes.func.isRequired,
    onMonsterSelect: PropTypes.func.isRequired,
    encounters: PropTypes.array.isRequired,
    players: PropTypes.array.isRequired,
    monsters: PropTypes.array.isRequired,
    encountersDefinitions: PropTypes.object.isRequired,
    playersDefinitions: PropTypes.object.isRequired,
    monstersDefinitions: PropTypes.object.isRequired,
    title: PropTypes.string,
  }

  render() {
    const { open, onDismiss, ...contentProps } = this.props;

    return <Drawer
      id='encounterMenu'
      open={open}
      onDismiss={onDismiss}
      direction='left'
    >
      <EncounterMenuContent
        {...contentProps}
      />
    </Drawer>
  }
}
