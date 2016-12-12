import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import Portal from '../Portal';
import './Modal.less';

export default class Modal extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
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
    const css = cn({
      'modal-overlay': true,
      'modal-overlay-active': this.state.open
    })

    const container = cn({
      'modal-content': true,
      'modal-content-active': this.state.open
    })

    return this.state.active
      ? <Portal id={this.props.id}>
          <div ref='overlay' className={css} onClick={this.dismiss.bind(this)}>
            <div className={container}>
              {this.props.children}
            </div>
          </div>
        </Portal>
      : null;
  }
}
