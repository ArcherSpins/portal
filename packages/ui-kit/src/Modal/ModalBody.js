// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type Props = {
    children?: Node
}


const ModalBody = ({ children }: Props) => (
  <div className={classNames(styles['modal-body'], 'modal_body')}>
    {children}
  </div>
);

ModalBody.defaultProps = {
  children: '',
};

export default ModalBody;
