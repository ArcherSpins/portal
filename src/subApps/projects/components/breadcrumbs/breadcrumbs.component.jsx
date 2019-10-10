/*eslint-disable */
import React from "react";
import Breadcrumbs from "react-router-dynamic-breadcrumbs";
import { connect } from "react-redux";
import capitalize from "../../helpers/capitalize";

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

const routes = (projects, tasks, milestones) => ({
  "/": "Projects",
  "/create": "Create new project",
  "/:projectId": (url, match) =>
    returnProjectTitle(projects, match[":projectId"]),
  "/:projectId/milestones": "Milestones",
  "/:projectId/milestones/:milestoneId": (url, match) =>
    returnMilestoneTitle(milestones, match[":milestoneId"]),
  "/:projectId/milestones/create": "Create new milestone",
  "/:projectId/milestones/:id/tasks": "Tasks",
  "/:projectId/milestones/:id/tasks/create": "Create Task",
  "/:projectId/milestones/:id/tasks/:taskId": (url, match) =>
    returnTaskTitle(tasks, match[":taskId"]),
  "/:projectId/milestones/:milestoneId/tasks/:taskId/logs": "Log history",
  "/:projectId/milestones/:milestoneId/tasks/:taskId/logs/:logId": ":logId",
  "/:projectId/milestones/:milestoneId/tasks/:taskId/logcreate": "Create log"
});

const StyledBreadcrumbs = ({ projects, tasks, milestones }) => {
  return (
    <Breadcrumbs
      mappedRoutes={routes(projects, tasks, milestones)}
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

export default connect(mapStateToProps)(StyledBreadcrumbs);
