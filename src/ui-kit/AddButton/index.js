/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
// @flow
import React from 'react';
import styles from './AddButton.module.scss';
import Spinner from '../Spinner';

type Props = {
    type?: string,
    className: string,
    loading: boolean
}


const AddButton = ({ type, className, loading = true }: Props) => (
  <button type={type} className={styles[className]} disabled={false}>
    {!loading && (<div className={styles.popover}>Add Task</div>)}
    {loading ? <Spinner data-type="spinner" /> : <span>+</span>}
  </button>
);

AddButton.defaultProps = {
  type: '',
};

export default AddButton;
