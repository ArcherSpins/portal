/* eslint-disable react/prop-types */
// TODO: ADD FLOW TYPING
import React from 'react';
import { withRouter } from 'react-router-dom';
import { ROOT } from '../../routes';
import { getUrlFromProject } from '../../helpers';
import capitalize from '../../helpers/capitalize';

import './project-item.styles.scss';

class ProjectItem extends React.Component {
  showLogTime = () => {
    const { estimatedTime } = this.props;
    const hours = estimatedTime / 60;
    return Math.floor(hours);
  };

  showSpentTime = () => {
    const { spentTime } = this.props;
    const hours = spentTime / 60;
    return Math.floor(hours);
  };

  render() {
    const {
      title, description, type, engagement, manager, url, history,
    } = this.props;
    return (
      // TODO: FIX THIS
      // eslint-disable-next-line
      <div
        className="project__item"
        onClick={() => history.push(`${ROOT}/${getUrlFromProject(url)}`)}
      >
        <div className="project__item-left">
          <h2 className="project__item-header">
            {title.length > 50
              ? `${capitalize(title.substring(0, 50))}...`
              : title}
          </h2>
          <div className="project__item-description">
            {description.length > 150
              ? `${description.substring(0, 150)}...`
              : description}
          </div>
          <p className="project__item-manager">
            Project Manager:
            {' '}
            <span className="project__item-manager-name">{manager}</span>
          </p>
        </div>
        <div className="project__item-right">
          <div className="text-gray project__item-type">
            <span>
              {type}
,
              {engagement}
            </span>
          </div>
          <div className="project__item-time">
            <span className="project__item-icon">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="clock"
                className="svg-inline--fa fa-clock fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                />
              </svg>
            </span>
            <span className="project__item-hours">
              {this.showSpentTime()}
/
              {this.showLogTime()}
              {' '}
hr
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProjectItem);
