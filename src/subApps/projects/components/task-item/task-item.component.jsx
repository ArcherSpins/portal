// @flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import type { RouterHistory, Match } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './task-item.styles.scss';

import { logEditHours, logEditMinutes } from '../../helpers/sumTime';

import type { Task } from '../../redux/task/task.flow-types';

// import { selectAllLogsByTaskIdProps } from "../../redux/log/log.selectors";

type Props = {
  openDescription: boolean,
  history: RouterHistory,
  match: Match,
  task: Task,
};

const TaskItem = (props: Props) => {
  const {
    task, openDescription, history, match,
  } = props;
  const {
    number,
    description,
    milestone,
    title,
    state,
    spentTime,
  } = task;
  return (
    <div className="task-item-wrapper">
      <div className="task-item">
        <span className="number">
          {number || 'null'}
          {' '}
        </span>
        <div className="name-wrapper">
          {openDescription && description.length > 0 ? (
            <>
              <span />
              <span>{`Milestone #${milestone.number} - ${milestone.title}`}</span>
            </>
          ) : null}
          <button
            className="name"
            type="button"
            onClick={() => history.push(`${match.url || ''}/task${number}`)}
          >
            {title}
          </button>
        </div>
        <span className="spent">
          {logEditHours(spentTime)}
:
          {logEditMinutes(spentTime)}
        </span>
        <span className="status">{state && state.title}</span>
        <div className="options-wrapper">
          <button
            className="options"
            type="button"
            onClick={() => history.push(`${props.match.url || ''}/task${number}`)}
          >
            <svg
              width="15"
              height="12"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.333374 9.99984H5.00004V11.3332H0.333374V9.99984ZM0.333374 5.33317H6.33337V6.6665H0.333374V5.33317ZM0.333374 0.666504H13.6667V1.99984H0.333374V0.666504ZM12.7827 6.68317L13.5534 6.4225L14.22 7.57717L13.6094 8.11384C13.6862 8.47827 13.6862 8.85473 13.6094 9.21917L14.22 9.75584L13.5534 10.9105L12.7827 10.6498C12.5094 10.8965 12.184 11.0865 11.826 11.2032L11.6667 11.9998H10.3334L10.1734 11.2025C9.81955 11.0869 9.49388 10.8984 9.21737 10.6492L8.44671 10.9105L7.78004 9.75584L8.39071 9.21917C8.31384 8.85473 8.31384 8.47827 8.39071 8.11384L7.78004 7.57717L8.44671 6.4225L9.21737 6.68317C9.49071 6.4365 9.81604 6.2465 10.174 6.12984L10.3334 5.33317H11.6667L11.8267 6.1305C12.184 6.2465 12.5094 6.43717 12.7827 6.68384V6.68317ZM11 9.99984C11.3537 9.99984 11.6928 9.85936 11.9429 9.60931C12.1929 9.35926 12.3334 9.02013 12.3334 8.6665C12.3334 8.31288 12.1929 7.97374 11.9429 7.72369C11.6928 7.47365 11.3537 7.33317 11 7.33317C10.6464 7.33317 10.3073 7.47365 10.0572 7.72369C9.80718 7.97374 9.66671 8.31288 9.66671 8.6665C9.66671 9.02013 9.80718 9.35926 10.0572 9.60931C10.3073 9.85936 10.6464 9.99984 11 9.99984Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            className="trash"
            type="button"
            onClick={() => history.push(`${props.match.url || ''}/task${number}/logs`)}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.74529 3.9785L10.714 3.00984L11.6566 3.9525L10.688 4.92117C11.6451 6.11928 12.1072 7.63842 11.9793 9.16659C11.8515 10.6948 11.1433 12.116 10.0003 13.1383C8.85728 14.1607 7.3662 14.7066 5.83328 14.6639C4.30036 14.6212 2.84196 13.9932 1.75761 12.9089C0.673248 11.8245 0.0452438 10.3661 0.00257003 8.83318C-0.0401037 7.30026 0.505792 5.80918 1.52814 4.66618C2.5505 3.52317 3.9717 2.81501 5.49987 2.68712C7.02804 2.55923 8.54718 3.02132 9.74529 3.9785ZM5.99996 13.3332C6.61279 13.3332 7.21963 13.2125 7.78581 12.9779C8.352 12.7434 8.86645 12.3997 9.29979 11.9663C9.73313 11.533 10.0769 11.0185 10.3114 10.4524C10.5459 9.88617 10.6666 9.27934 10.6666 8.6665C10.6666 8.05367 10.5459 7.44683 10.3114 6.88065C10.0769 6.31446 9.73313 5.80001 9.29979 5.36667C8.86645 4.93333 8.352 4.58959 7.78581 4.35507C7.21963 4.12054 6.61279 3.99984 5.99996 3.99984C4.76228 3.99984 3.5753 4.4915 2.70013 5.36667C1.82496 6.24184 1.33329 7.42883 1.33329 8.6665C1.33329 9.90418 1.82496 11.0912 2.70013 11.9663C3.5753 12.8415 4.76228 13.3332 5.99996 13.3332ZM5.33329 5.33317H6.66663V9.33317H5.33329V5.33317ZM3.33329 0.666504H8.66663V1.99984H3.33329V0.666504Z"
                fill="black"
              />
            </svg>
          </button>
        </div>
      </div>
      {openDescription ? (
        <div className="task-item-description">
          <div className="description">{description}</div>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  // logs: selectAllLogsByTaskIdProps
});

// $FlowFixMe
export default withRouter(connect(mapStateToProps)(TaskItem));
