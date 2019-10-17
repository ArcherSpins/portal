// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type Props = {
    show?: boolean,
    children: Node,
    onRequestClose: () => void
};

const Modal = ({
  show, children, onRequestClose,
}: Props) => (
  <>
    <button
      type="button"
      className={classNames(styles.backdrop, { [styles.backdrop__visible]: show })}
      onClick={onRequestClose}
    >
      {' '}
    </button>
    <div
      className={classNames(styles['modal-wrapper'], { [styles.visible]: show })}
    >
      {children}
    </div>
  </>

);


Modal.defaultProps = {
  show: false,
};

export default Modal;
