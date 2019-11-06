import React from 'react';
import ReactLoading from 'react-loading';

import './custom-spinner.styles.scss';

const CustomSpinner = () => (
  <div className="custom-spinner">
    <ReactLoading
      type="spin"
      color="#d1d6de"
      width="7%"
      className="spinner"
    />
  </div>
);

export default CustomSpinner;
