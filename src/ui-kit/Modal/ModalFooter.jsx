// @flow
import React, { type Node } from 'react';
import styles from './Modal.module.scss';

type Props = {
    children?: Node
}


const ModalFooter = ({ children }: Props) => (
  <div className={styles['modal-footer']}>
    {children}
  </div>
);

ModalFooter.defaultProps = {
  children: '',
};

export default ModalFooter;
