/* eslint-disable */
// @flow
import React, { Component } from 'react';
// import { Animated } from 'ui-kit';
import { CSSTransition } from 'react-transition-group';
import noop from 'lodash.noop';

import styles from './Toast.module.scss';

type Props = {
};

type State = {
  notification: ?string
}

class Toast extends Component<Props, State> {
  static defaultProps = {
    onPush: noop,
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      notification: null
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

  render() {
    const { notification } = this.state;
    console.log(notification);
    return (
      <CSSTransition
        in={!!notification}
        classNames="fadeInDown"
        timeout={300}
        unmountOnExit
      >
        <div>
          <div className={styles.toast}>
            {notification}
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Toast;
