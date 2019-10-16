/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
// @flow
import React, { type Node } from 'react';
import styles from './AddButton.module.scss';

type Props = {
    type?: string,
    className: string,
    children: Node
}


const AddButton = ({ type, className, children }: Props) => (
  <button type={type} className={styles[className]}>{children}</button>
);

AddButton.defaultProps = {
  type: '',
};

export default AddButton;
