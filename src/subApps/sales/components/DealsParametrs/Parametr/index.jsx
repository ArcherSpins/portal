import React from 'react';
import './style.scss';

export default () => (
  <li className="item-parametr">
    <div
      className="block-parametr d-flex justify-content-between align-items-center"
    >
      <span>Parameter #1</span>
      <div className="d-flex buttons-parametr">
        <button type="button">All</button>
        <button type="button">HR</button>
        <button type="button">Sales</button>
      </div>
      <button type="button" className="delete-button">
        <svg
          width="12"
          height="15"
          viewBox="0 0 12 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0H4V2H0V4H12V2H8V0ZM1 5H11V13C11 14.1046 10.1046 15 9 15H3C1.89543 15 1 14.1046 1 13V5Z"
            fill="#E7EAEF"
          />
        </svg>
      </button>
    </div>
  </li>
);
