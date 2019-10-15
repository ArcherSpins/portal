// @flow
import React from 'react';
import noop from 'lodash.noop';

import styles from './Modal.module.scss';

type ButtonClasses = 'btn-cancel' | 'btn-continue';

type Props = {
    show?: boolean,
    children: string,
    object: string,
    use1: ButtonClasses,
    use2: ButtonClasses,
    secondButtonText: string,
    firstButtonText: string,
    headerText: string,
    close?: () => void,
    func?: () => void
};

const Modal = ({
  show, children, object, close, func, use1, use2, headerText, secondButtonText, firstButtonText,
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
          {headerText}
          {' '}
          {object}
        </h3>
      </div>
      <div className={styles['modal-body']}>
        <p>{children}</p>
      </div>
      <div className={styles['modal-footer']}>
        <button type="button" className={styles[use1]} onClick={close}>
          {firstButtonText}
        </button>
        <button type="button" className={styles[use2]} onClick={() => func()}>
          {secondButtonText}
        </button>
      </div>
    </div>
  </div>
);

Modal.defaultProps = {
  show: false,
  close: noop,
  func: noop,
};

export default Modal;
