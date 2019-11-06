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
  <button
    type="button"
    className={classNames(styles.backdrop, { [styles.backdrop__visible]: show }, className)}
    onClick={onRequestClose}
  >
    <div
      className={classNames(styles['modal-wrapper'], { [styles.visible]: show })}
    >
      {children}
    </div>
  </button>
);


Modal.defaultProps = {
  show: false,
  className: '',
};

export default Modal;
