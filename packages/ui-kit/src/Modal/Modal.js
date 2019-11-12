// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type Props = {
  show?: boolean,
  children: Node,
  onRequestClose: () => void,
  className?: string
};

const Modal = ({
  show, children, onRequestClose, className,
}: Props) => (
  <div
    className={classNames(styles.backdrop, { [styles.backdrop__visible]: show }, className)}
  >
    <button
      className={styles.button_modal}
      type="button"
      onClick={onRequestClose}
    >
      {' '}
    </button>
    <div
      className={classNames(styles['modal-wrapper'], 'modal_wrapper', { [styles.visible]: show })}
    >
      {children}
    </div>
  </div>
);


Modal.defaultProps = {
  show: false,
  className: '',
};

export default Modal;
