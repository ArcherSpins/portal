/* eslint-disable */
// @flow
import React, { Component } from 'react';
// import { Animated } from 'ui-kit';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import noop from 'lodash.noop';

import styles from './Toast.module.scss';
import './index.scss';

type Props = {
};

type State = {
  notification: ?string,
  id: number
}

class Toast extends Component<Props, State> {
  static defaultProps = {
    onPush: noop,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      notification: null,
      id: 0
    }
  }

  TIMEOUT: number = 5;
  timeout: ?TimeoutID = null;

  push = (message: string) => {
    const { notification } = this.state;
    if (notification) {
      this.close();
    }

    this.setState({ notification: message }, this.setTimer);
  }

  clearTimer = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };

  setTimer = () => {
    this.clearTimer();
    this.timeout = setTimeout(this.close, this.TIMEOUT * 1000);
  }

  close = () => {
    this.setState({ notification: null });
  }

  renderToast = () => {
    const { notification, id } = this.state;

    if (!notification) {
      return null;
    };

    return (
      <CSSTransition
        key={id}
        classNames="toast"
        timeout={{
          enter: 200,
          exit: 150,
        }}
      >
        <div className={styles.toast}>
          {notification}
        </div>
      </CSSTransition>
    );
  }

  render() {
    const { notification } = this.state;
    return (
      <TransitionGroup>
        {this.renderToast()}
      </TransitionGroup>
    );
  }
}

export default Toast;
