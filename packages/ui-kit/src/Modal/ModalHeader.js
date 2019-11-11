// @flow
import React, { type Node } from 'react';
import styles from './Modal.module.scss';

type Props = {
    children?: Node
}


const ModalHeader = ({ children }: Props) => (
  <div className={styles['modal-header']}>
    {children}
  </div>
);

ModalHeader.defaultProps = {
  children: '',
};

export default ModalHeader;
