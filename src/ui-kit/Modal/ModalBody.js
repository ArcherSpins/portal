// @flow
import React, { type Node } from 'react';
import styles from './Modal.module.scss';

type Props = {
    children?: Node
}


const ModalBody = ({ children }: Props) => (
  <div className={styles['modal-body']}>
    {children}
  </div>
);

ModalBody.defaultProps = {
  children: '',
};

export default ModalBody;
