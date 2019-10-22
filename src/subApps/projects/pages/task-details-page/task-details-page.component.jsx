// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { RouterHistory, Match } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Button, TextArea, Input } from 'ui-kit';
import Header from 'subApps/projects/components/header';

import { editTask, deleteTask } from '../../redux/task/task.actions';
import { selectTaskByParams } from '../../redux/task/task.selectors';
import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectServerError } from '../../redux/error/error.selectors';

import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Task, TaskCreation } from '../../redux/task/task.flow-types';
import type { Error } from '../../redux/error/error.flow-types';

import { states } from './task-details.states';
import './task-details-page.styles.scss';

import Modal from '../../components/modal/modal.component';

type State = {
  status: string,
  subject: string,
  description: string,
  assignee: string,
  errors: Array<string>,
  isShowing: boolean,
  milestone: {
    id: string,
    title: string,
    number: number
  },
  project: {
    id: string,
    title: string
  }
};

type Props = {
  task: Task,
  milestone: Milestone,
  editTask: (task: TaskCreation, history: RouterHistory) => Task,
  deleteTask: (taskId: string, history: RouterHistory) => void,
  history: RouterHistory,
  match: Match,
  error: Error
};

class TaskDetails extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      project: props.task.project,
      milestone: props.task.milestone,
      status: props.task.state.id,
      subject: props.task.title,
      description: props.task.description,
      assignee: props.task.assignedUser.name,
      errors: [],
      isShowing: false,
    };
  }

  handleChange = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.error.message) {
      let { errors } = this.state;
      errors = [nextProps.error.message, ...errors];
      this.setState({ errors });
    }
  };

  validate = () => {
    const { subject, assignee } = this.state;
    const errors = [];

    if (!subject) {
      errors.push('Subject Field');
    }

    if (!assignee) {
      errors.push('Spent Field');
    }

    return errors;
  };

  handleSubmit = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    const isValid = this.validate();
    const { subject, description, status } = this.state;
    // TODO: Fix this
    // eslint-disable-next-line no-shadow
    const { task, editTask, history } = this.props;
    const { id } = task;
    if (isValid.length) {
      this.setState({ errors: isValid });
    } else {
      const editedTask = {
        id,
        stateID: status,
        title: subject,
        description,
        assignedUserID: '0',
      };
      editTask(editedTask, history);
    }
  };

  openModalHandler = () => {
    this.setState({
      isShowing: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  onDeleteClick = () => {
    // TODO: FIX ME
    // eslint-disable-next-line no-shadow
    const { deleteTask, task, history } = this.props;
    this.setState({ isShowing: false }, () => {
      deleteTask(task.id, history);
    });
  };

  render() {
    const {
      subject,
      description,
      assignee,
      status,
      errors,
      project,
      milestone,
      isShowing,
    } = this.state;
    const { match, history } = this.props;
    return (
      <div className="task-details">
        <Header>
          <div>
            <h1 className="heading-primary mb05">
              Project:
              {' '}
              {project.title}
            </h1>
            <h2 className="heading-secondary">
              Milestone #
              {milestone.number}
              :
              {' '}
              {milestone.title}
            </h2>
          </div>
          <div className="header-buttons">
            <Button
              use="danger"
              size="sm"
              onClick={this.openModalHandler}
            >
              Delete task
            </Button>
          </div>
        </Header>
        <h1 className="heading-primary mb05">Project management system</h1>
        <form onSubmit={this.handleSubmit} className="body">
          <div className="body__left">
            <Input
              label="Subject"
              placeholder="Placeholder text"
              name="subject"
              value={subject}
              onChange={this.handleChange}
              className="project__input"
            />
            <TextArea
              label="Description"
              name="description"
              value={description}
              onChange={this.handleChange}
              className="project__input"
            />
            <div className="status-wrapper">
              <h3 className="heading-tertiarry">Status</h3>
              <select
                onChange={this.handleChange}
                name="status"
                value={status}
                className="status-field"
                required
              >
                {states.map((o) => (
                  <option value={o.id} key={o.id}>
                    {o.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-wrapper">
              <h3 className="heading-tertiarry">Assignee</h3>
              <select
                className="select"
                required
                name="assignee"
                value={assignee}
                onChange={this.handleChange}
              >
                {assignee ? (
                  <option value={`${assignee}`} selected>
                    {assignee}
                  </option>
                ) : (
                  <option value="" disabled selected>
                    Not selected
                  </option>
                )}
                {/* eslint-disable-next-line react/destructuring-assignment */}
                {this.props.milestone
                  // TODO: FIX ME
                  // eslint-disable-next-line react/destructuring-assignment
                  ? this.props.milestone.participants.map((p) => (
                    <option key={p.id} value={`${p.name}`}>
                      {p.name}
                    </option>
                  ))
                  : null}
              </select>
            </div>
            <div>
              {errors.length >= 1 && (
                <div
                  style={{
                    color: 'red',
                    margin: '5px',
                    fontSize: '14px',
                  }}
                >
                  Sorry, something went wrong please check
                  {' '}
                  {errors.join(', ')}
.
                </div>
              )}
              <div className="body-buttons">
                <Button type="submit">
                  Save
                </Button>
                <div>
                  <Button
                    onClick={() => history.push(
                      `${match.url || ''}/logs/logcreate`,
                    )}
                    className="mr1"
                    use="transparent"
                  >
                    Add Log
                  </Button>
                  <Button
                    onClick={() => history.push(
                      `${match.url || ''}/logs`,
                    )}
                    use="transparent"
                  >
                    Log History
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="body__right" />
        </form>
        {isShowing ? (
          // TODO: FIX THIS
          // eslint-disable-next-line
          <div role="button" onClick={this.closeModalHandler} className="back-drop" />
        ) : null}
        <Modal
          className="modal"
          show={isShowing}
          close={this.closeModalHandler}
          object="Task"
          func={this.onDeleteClick}
        >
          Are you sure you want to delete?
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  task: selectTaskByParams,
  milestone: selectMilestoneByParams,
  error: selectServerError,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { deleteTask, editTask },
)(TaskDetails);
