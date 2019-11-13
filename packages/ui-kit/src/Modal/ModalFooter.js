// @flow
import React, { type Node } from 'react';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type Props = {
    children?: Node
}


const ModalFooter = ({ children }: Props) => (
  <div className={classNames(styles['modal-footer'], 'modal_footer')}>
    {children}
  </div>
);

ModalFooter.defaultProps = {
  children: '',
};

export default ModalFooter;
