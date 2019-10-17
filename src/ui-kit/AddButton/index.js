/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
// @flow
import React from 'react';
import styles from './AddButton.module.scss';

type Props = {
    type?: string,
    className: string
}


const AddButton = ({ type, className }: Props) => (
  <button type={type} className={styles[className]}>
    <div>Add Task</div>
  </button>
);

AddButton.defaultProps = {
  type: '',
};

export default AddButton;
