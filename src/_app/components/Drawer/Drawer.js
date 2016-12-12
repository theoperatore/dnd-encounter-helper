import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import Portal from '../Portal';

import './Drawer.less';

export default class Drawer extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf(['left', 'right']),
    onDismiss: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      open: false,
    }

    this.handleDismiss = this.handleDismiss.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open && nextProps.open === true) {
      document.body.style.overflow = 'hidden';
      this.setState({ active: true }, () => {
        setTimeout(() => {
          this.setState({ open: true });
        }, 100);
      });
    } else if (nextProps.open !== this.props.open && nextProps.open === false) {
      document.body.style.overflow = 'auto';
      this.setState({ open: false }, () => {
        setTimeout(() => {
          this.setState({ active: false });
        }, 300);
      });
    }
  }

  handleDismiss(ev) {
    if (ev.target === findDOMNode(this.refs['drawer-overlay'])) {
      ev.preventDefault();
      ev.stopPropagation();

      this.props.onDismiss();
    }
  }

  render() {
    const overlayCss = cn({
      'drawer-overlay': true,
      'drawer-overlay-open': this.state.open,
      'drawer-overlay-from-left': this.props.direction === 'left',
      'drawer-overlay-from-right': this.props.direction === 'right',
    });

    const bodyCss = cn({
      'drawer-body': true,
      'drawer-body-open': this.state.open,
      'drawer-body-from-left': this.props.direction === 'left',
      'drawer-body-from-right': this.props.direction === 'right',
    })

    return this.state.active
      ? <Portal id={`dr-${this.props.id}`}>
          <div
            className={overlayCss}
            ref='drawer-overlay'
            onClick={this.handleDismiss}
          >
            <div className={bodyCss}>{this.props.children}</div>
          </div>
        </Portal>
      : null;
  }
}
