/* eslint-disable react/no-unused-state */
// @flow

import React from 'react';
import { Link } from 'react-router-dom';
// TODO: Refactor this to date-fns
import dayjs from 'dayjs';
import getRoute from '../../helpers/getRoute';
import './style.scss';

export type SearchItemProps = {
  className: string,
  title: string,
  manager: {
    name: string,
  },
  client: string,
  createdAt: string,
  stage: {
    title: string,
  },
  path: string
}

// eslint-disable-next-line import/prefer-default-export
export const SearchItem = ({
  className,
  title,
  manager,
  client,
  createdAt,
  stage,
  path,
}: SearchItemProps) => (
  <li className="search-item">
    <Link to={getRoute(path)}>
      <div className={`search-item-block ${className}`}>
        <h4 className="search-item-title">
          {title}
        </h4>
        <div className="name">{client}</div>
        <div>
          <p>{dayjs(createdAt).format('DD MMMM YYYY hh:mm')}</p>
        </div>
        <div className="status">{stage.title}</div>
        <div className="info">
          <span>Manager:</span>
          {manager.name}
        </div>
      </div>
    </Link>
  </li>
);
