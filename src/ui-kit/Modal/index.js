// @flow
import React from 'react';
import noop from 'lodash.noop';

import styles from './Modal.module.scss';

type Props = {
    show?: boolean,
    children?: string,
    object?: string,
    close?: () => void,
    func?: () => void
};

const Modal = ({
  show, children, object, close, func,
}: Props) => (
  <div>
    <div
      className={styles['modal-wrapper']}
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      <div className={styles['modal-header']}>
        <h3>
            Delete
          {' '}
          {object}
        </h3>
      </div>
      <div className={styles['modal-body']}>
        <p>{children}</p>
      </div>
      <div className={styles['modal-footer']}>
        <button type="button" className={styles['btn-cancel']} onClick={close}>
            Close
        </button>
        <button type="button" className={styles['btn-continue']} onClick={() => func()}>
            Delete
        </button>
      </div>
    </div>
  </div>
);

Modal.defaultProps = {
  show: false,
  children: '',
  object: '',
  close: noop,
  func: noop,
};

export default Modal;
