/*eslint-disable */
// TODO: FIX THIS
import React from "react";
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import { connect } from "react-redux";
import capitalize from "../../helpers/capitalize";
import * as routes from '../../routes';

import "./breadcrumbs.styles.scss";

const returnProjectTitle = (projects, id) => {
  const existProject = projects.find(project => project.id === id);
  if (existProject) {
    const title = capitalize(existProject.title);
    if (title.length > 30) {
      const cuttedTitle = `${title.substring(0, 30)}...`;
      return cuttedTitle;
    }
    return title;
  }
};

const returnMilestoneTitle = (milestones, id) => {
  const existProject = milestones.find(
    milestone => milestone.number == id.substring(9)
  );
  if (existProject) {
    const title = capitalize(existProject.title);
    if (title.length > 30) {
      const cuttedTitle = `${title.substring(0, 30)}...`;
      return cuttedTitle;
    }
    return title;
  }
};

const returnTaskTitle = (tasks, id) => {
  const existProject = tasks.find(task => task.number == id.substring(4));
  if (existProject) {
    const title = capitalize(existProject.title);
    if (title.length > 30) {
      const cuttedTitle = `${title.substring(0, 30)}...`;
      return cuttedTitle;
    }
    return title;
  }
};

const mapRoutes = (projects, tasks, milestones) => ({
  [routes.ROOT]: "Projects",

  [routes.CREATE_PROJECT_ROUTE]: "Create new project",

  [routes.PROJECT_DETAILS_ROUTE]: (url, match) =>
    returnProjectTitle(projects, match[":projectId"]),
    
  [routes.MILESTONES_ROUTE]: "Milestones",

  [routes.MILESTONE_DETAILS_ROUTE]: (url, match) =>
    returnMilestoneTitle(milestones, match[":milestoneId"]),
    
  [routes.MILESTONE_ADD_ROUTE]: "Create new milestone",

  [routes.TASKS_ROUTE]: "Tasks",

  [routes.TASK_ADD_ROUTE]: "Create Task",

  [routes.TASK_DETAILS_ROUTE]: (url, match) =>
    returnTaskTitle(tasks, match[":taskId"]),
    
  [routes.LOG_HISTORY_ROUTE]: "Log history",
  [routes.LOG_EDIT_ROUTE]: ":logId",
  [routes.LOG_CREATE_ROUTE]: "Create log"
});

const StyledBreadcrumbs = ({ projects, tasks, milestones, location }) => {
  if (location.pathname === routes.ROOT) {
    return null;
  }
  return (
    <Breadcrumbs
      mappedRoutes={mapRoutes(projects, tasks, milestones)}
      WrapperComponent={props => (
        <ul className="breadcrumbs">{props.children}</ul>
      )}
      ActiveLinkComponent={props => (
        <li className="active-link">{props.children}</li>
      )}
      LinkComponent={props => (
        <li className="link">
          {props.children}
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="angle-right"
            className="svg-inline--fa fa-angle-right fa-w-8"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 512"
          >
            <path
              fill="currentColor"
              d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"
            ></path>
          </svg>
        </li>
      )} // Don't create link tag or <Link />. Component will wrapp props.children with <Link />
    />
  );
};

const mapStateToProps = state => ({
  milestones: state.milestone.milestones,
  tasks: state.task.tasks,
  projects: state.project.projects
});

export default compose(
  withRouter, 
  connect(mapStateToProps)
)(StyledBreadcrumbs);