// @flow
import React from 'react';
import './style.scss';

type Props = {
  tasksInfo: {
    today: number,
    overdue: number,
    without: number
  }
}

const HeaderCRMList = ({ tasksInfo }: Props) => (
  <div>
    <div className="statuses-crm-list">
      <p className="success_status">{`${tasksInfo.today || 0} Tasks for Today`}</p>
      <p className="error_status">{`${tasksInfo.overdue || 0} overdue Tasks`}</p>
      <p className="default_status">{`${tasksInfo.without || 0} without Tasks`}</p>
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
