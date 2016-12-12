import React, { Component, PropTypes } from 'react';
import Drawer from '../../components/Drawer/Drawer';

export default class ProfileMenu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onDismiss: PropTypes.func.isRequired,
  }

  render() {
    const {
      open,
      onDismiss,
    } = this.props;

    return <Drawer
      id='profileMenu'
      open={open}
      onDismiss={onDismiss}
      direction='right'
    >
      <h3>Profile</h3>
    </Drawer>
  }
}
