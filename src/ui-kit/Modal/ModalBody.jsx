// @flow
import React from 'react';
import styles from './Modal.module.scss';

type Props = {
    children?: React.Node
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
