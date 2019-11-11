/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// TODO: FIX THIS
// @flow
import React from 'react';
import type { RouterHistory, Match } from 'react-router-dom';
import { withRouter, Link } from 'react-router-dom';
import createTestContext from 'utils/createTestContext';
// import { ROOT } from 'subApps/projects/routes';
import { spentTimeInHours } from '../../helpers/sumTime';

import './milestone-item.styles.scss';

const createTestAttr = createTestContext('milestone');

type Props = {
  title: string,
  estimatedTime: number,
  number: number,
  spentTime: number,
  status: string,
  history: RouterHistory,
  match: Match,
  openDescription: boolean,
  description: string,
  id: string
};

const MilestoneItem = (props: Props) => (
  <div className="milestone-item-wrapper">
    <div className="milestone-item">
      <span className="milestone-item__number">{props.number || 'null'}</span>
      <span
        className="milestone-item__title"
        data-test={createTestAttr('milestone-title')}
        onClick={() => props.history.push(
          `${props.match.url || ''}/milestone${props.number}`,
        )}
      >
        {props.title}
      </span>
      <span className="milestone-item__spent">
        {spentTimeInHours(props.spentTime)}
        /
        {props.estimatedTime / 60}
      </span>
      <span className="milestone-item__status">{props.status}</span>
      <div className="milestone-item__details-wrapper">
        <Link
          className="milestone-item__tasks"
          data-test={createTestAttr('tasks')}
          to={`${props.match.url || ''}/milestone${props.number}/tasks`}
          // onClick={() => props.history.push(
          //   `${props.match.url || ''}/milestone${props.number}/tasks`,
          // )}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 1.99459V14.0053C13.9986 14.1803 13.9284 14.3478 13.8045 14.4716C13.6807 14.5953 13.5131 14.6654 13.338 14.6666H2.662C2.48654 14.6666 2.31826 14.5969 2.19413 14.4729C2.07 14.3489 2.00018 14.1807 2 14.0053V1.99459C2.0014 1.81951 2.07161 1.652 2.19548 1.52826C2.31934 1.40452 2.48692 1.33447 2.662 1.33325H13.338C13.7033 1.33325 14 1.62925 14 1.99459ZM12.6667 2.66659H3.33333V13.3333H12.6667V2.66659ZM7.52867 8.74725L10.3573 5.91925L11.3 6.86192L7.52867 10.6333L4.93533 8.03992L5.87867 7.09725L7.52867 8.74725Z"
              fill="black"
            />
          </svg>
        </Link>
        <Link
          to={`${props.match.url || ''}/milestone${props.number}`}
          className="milestone-item__details"
          data-test={createTestAttr('details')}
          // onClick={() => props.history.push(
          //   `${props.match.url || ''}/milestone${props.number}`,
          // )}
        >
          <svg
            width="15"
            height="12"
            viewBox="0 0 15 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.333374 10.0001H5.00004V11.3334H0.333374V10.0001ZM0.333374 5.33341H6.33337V6.66675H0.333374V5.33341ZM0.333374 0.666748H13.6667V2.00008H0.333374V0.666748ZM12.7827 6.68341L13.5534 6.42275L14.22 7.57741L13.6094 8.11408C13.6862 8.47852 13.6862 8.85498 13.6094 9.21941L14.22 9.75608L13.5534 10.9107L12.7827 10.6501C12.5094 10.8967 12.184 11.0867 11.826 11.2034L11.6667 12.0001H10.3334L10.1734 11.2027C9.81955 11.0871 9.49388 10.8986 9.21737 10.6494L8.44671 10.9107L7.78004 9.75608L8.39071 9.21941C8.31384 8.85498 8.31384 8.47852 8.39071 8.11408L7.78004 7.57741L8.44671 6.42275L9.21737 6.68341C9.49071 6.43675 9.81604 6.24675 10.174 6.13008L10.3334 5.33341H11.6667L11.8267 6.13075C12.184 6.24675 12.5094 6.43741 12.7827 6.68408V6.68341ZM11 10.0001C11.3537 10.0001 11.6928 9.8596 11.9429 9.60956C12.1929 9.35951 12.3334 9.02037 12.3334 8.66675C12.3334 8.31313 12.1929 7.97399 11.9429 7.72394C11.6928 7.47389 11.3537 7.33341 11 7.33341C10.6464 7.33341 10.3073 7.47389 10.0572 7.72394C9.80718 7.97399 9.66671 8.31313 9.66671 8.66675C9.66671 9.02037 9.80718 9.35951 10.0572 9.60956C10.3073 9.8596 10.6464 10.0001 11 10.0001Z"
              fill="black"
            />
          </svg>
        </Link>
      </div>
    </div>
    {props.openDescription && props.description.length > 0 ? (
      <div className="milestone-item-description">
        <span className="description">{props.description}</span>
      </div>
    ) : null}
  </div>
);

export default withRouter(MilestoneItem);
