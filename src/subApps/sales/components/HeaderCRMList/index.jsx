import React from 'react';
import './style.scss';

const HeaderCRMList = () => (
  <div>
    <div className="statuses-crm-list">
      <p className="success_status">6 Tasks for Today</p>
      <p className="error_status">12 overdue Tasks</p>
      <p className="default_status">16 without Tasks</p>
    </div>
    <div className="header-crm-list fz-14">
      <ul>
        <li>
          <div>Lead</div>
        </li>
        <li>
          <div>Introduction</div>
        </li>
        <li>
          <div>Estimation</div>
        </li>
        <li>
          <div>Negotiation</div>
        </li>
      </ul>
    </div>
  </div>
);

// eslint-disable-next-line import/prefer-default-export
export { HeaderCRMList };
