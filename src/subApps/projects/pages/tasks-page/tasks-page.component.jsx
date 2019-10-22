// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { Match } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Header from 'subApps/projects/components/header';
import './tasks-page.styles.scss';

import { getTasks } from '../../redux/task/task.actions';

import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectProjectItem } from '../../redux/project/project.selectors';
import { selectAllTasks } from '../../redux/task/task.selectors';

import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Task } from '../../redux/task/task.flow-types';
import type { Project } from '../../redux/project/project.flow-types';

import LinkButton from '../../components/link-button/link-button.component';
import PaginationComponent from '../../components/pagination/pagination.component';
import TaskItem from '../../components/task-item/task-item.component';


type State = {
  openDescription: boolean,
  activePage: number
};

type Props = {
  milestone: Milestone,
  project: Project,
  tasks: Array<Task>,
  match: Match,
  getTasks: (id: string) => Array<Task>
};

class TasksPage extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      openDescription: false,
      activePage: 1,
    };
  }

  componentDidMount(): void {
    // TODO: FIX THIS
    // eslint-disable-next-line no-shadow
    const { getTasks, milestone } = this.props;
    getTasks(milestone.id);
  }

  handlePaginationChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { openDescription, activePage } = this.state;
    const { project, milestone, match } = this.props;
    const { tasks } = this.props;
    return (
      <div className="tasks">
        <Header>
          <div>
            <h1 className="heading-primary mb05">
            Project:
              {' '}
              {project.title}
            </h1>
            <h2 className="heading-secondary">
            Milestone #
              {milestone ? milestone.number : 'null'}
:
              {' '}
              {milestone && milestone.title}
            </h2>
          </div>
        </Header>

        <div className="tasks__size">
          <div className="tasks__subheader">
            <div className="tasks__subheader-left">
              <h3 className="tasks__subheader-title">Tasks</h3>
              <div className="tasks__sort">
                <button
                  type="button"
                  className={`${
                    !openDescription ? 'active' : ''
                  } tasks__subheader-sort`}
                  onClick={() => this.setState({ openDescription: false })}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.33333 0.666829H12V2.00016H3.33333V0.666829ZM0 0.333496H2V2.3335H0V0.333496ZM0 5.00016H2V7.00016H0V5.00016ZM0 9.66683H2V11.6668H0V9.66683ZM3.33333 5.3335H12V6.66683H3.33333V5.3335ZM3.33333 10.0002H12V11.3335H3.33333V10.0002Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${
                    openDescription ? 'active' : ''
                  } tasks__subheader-sort`}
                  onClick={() => this.setState({ openDescription: true })}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33333 0.666504H12V1.99984H5.33333V0.666504ZM5.33333 3.33317H9.33333V4.6665H5.33333V3.33317ZM5.33333 7.33317H12V8.6665H5.33333V7.33317ZM5.33333 9.99984H9.33333V11.3332H5.33333V9.99984ZM0 0.666504H4V4.6665H0V0.666504ZM1.33333 1.99984V3.33317H2.66667V1.99984H1.33333ZM0 7.33317H4V11.3332H0V7.33317ZM1.33333 8.6665V9.99984H2.66667V8.6665H1.33333Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="tasks__subheader-right">
              <LinkButton to={`${match.url}/create`}>
                Add Task
              </LinkButton>
            </div>
          </div>
          {tasks.length >= 1 && (
            <PaginationComponent
              activePage={activePage}
              totalItemsCount={tasks.length}
              itemsCountPerPage={10}
              onChange={this.handlePaginationChange}
            />
          )}
          <div className="tasks__list-header">
            <div className="tasks__list-head">#</div>
            <div className="tasks__list-head">Tasks</div>
            <div className="tasks__list-head">Spent</div>
            <div className="tasks__list-head">Status</div>
            <div />
          </div>
          <div className="tasks__list-body">
            {tasks
              && tasks
                // $FlowFixMe
                .sort((a, b) => a.number > b.number)
                .map((task) => (
                  <TaskItem
                    openDescription={openDescription}
                    task={task}
                    key={task.id}
                  />
                ))}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  milestone: selectMilestoneByParams,
  project: selectProjectItem,
  tasks: selectAllTasks,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { getTasks },
)(TasksPage);
