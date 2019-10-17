// @flow
import React, { type Node } from 'react';

import styles from './Modal.module.scss';

type Props = {
    show?: boolean,
    children: Node,
};

const Modal = ({
  show, children,
}: Props) => (
  <div>
    <div
      className={styles['modal-wrapper']}
      style={{
        transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: show ? '1' : '0',
      }}
    >
      {children}
    </div>
  </div>
);


Modal.defaultProps = {
  show: false,
};

export default Modal;
