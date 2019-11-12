// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type Props = {
    children?: Node
}


const ModalHeader = ({ children }: Props) => (
  <div className={classNames(styles['modal-header'], 'modal_header')}>
    {children}
  </div>
);

ModalHeader.defaultProps = {
  children: '',
};

export default ModalHeader;
