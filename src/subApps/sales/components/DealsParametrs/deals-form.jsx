/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Select from 'react-select';
import Button from '../shared/Button/Button';

import './style.scss';

const customStyles = {
  control: (base) => ({
    ...base,
    minHeight: 32,
  }),
  dropdownIndicator: (base) => ({
    ...base,
    paddingTop: 0,
    paddingBottom: 0,
  }),
};

export default () => (
  <div className="block-form">
    <div className="title">Add parameter</div>
    <div
      className="form-parametrs-creator justify-content-between align-items-center"
    >
      <div className="big-block field-block">
        <label htmlFor="parameter_name">Parameter name</label>
        <input
          id="parameter_name"
          className="input-form"
          placeholder="Not specified"
        />
      </div>
      <div className="small-block field-block">
        <label htmlFor="available">Available to</label>
        <Select
          styles={customStyles}
          options={[]}
          value=""
          id="available"
          className="select-details"
        />
      </div>
      <div className="button-block field-block">
        <Button styleButton={{ maxHeight: '32px' }} text="Add parameter" />
      </div>
    </div>
  </div>
);
