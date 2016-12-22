import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';

import Portal from '../Portal';
import './Popup.less';

export default class Popup extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    direction: PropTypes.oneOf(['top', 'bottom']),
    onDismiss: PropTypes.func.isRequired
  }

  static defaultProps = {
    active: false,
  }

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      open: false,
    };

    this.dismiss = this.dismiss.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active && nextProps.active === true) {
      document.body.style.overflow = 'hidden';
      this.setState({ active: true }, () => {
        setTimeout(() => {
          this.setState({ open: true });
        }, 100);
      })
    }
    else if (nextProps.active !== this.props.active && nextProps.active === false) {
      document.body.style.overflow = 'auto';
      this.setState({ open: false }, () => {
        setTimeout(() => {
          this.setState({ active: false });
        }, 300);
      })
    }
  }

  dismiss(ev) {
    if (ev.target === ReactDOM.findDOMNode(this.refs.overlay)) {
      ev.preventDefault();
      ev.stopPropagation();

      this.props.onDismiss();
    }
  }

  render() {
    const overlayCss = cn({
      'popup-overlay': true,
      'popup-overlay-open': this.state.open,
      'popup-overlay-from-top': this.props.direction === 'top',
      'popup-overlay-from-bottom': this.props.direction === 'bottom',
    });

    const bodyCss = cn({
      'popup-body': true,
      'popup-body-open': this.state.open,
      'popup-body-from-top': this.props.direction === 'top',
      'popup-body-from-bottom': this.props.direction === 'bottom',
    })

    return this.state.active
      ? <Portal id={`pu-${this.props.id}`}>
          <div
            className={overlayCss}
            ref='overlay'
            onClick={this.handleDismiss}
          >
            <div className={bodyCss}>{this.props.children}</div>
          </div>
        </Portal>
      : null;
  }
}
