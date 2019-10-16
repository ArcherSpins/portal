// @flow
import React from 'react';
import styles from './Modal.module.scss';

type Props = {
    children?: React.Node
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
