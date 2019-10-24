// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from 'subApps/projects/components/header';
import {
  Input, TextArea, Button, H1,
} from 'ui-kit';

import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectProjectItem } from '../../redux/project/project.selectors';
import { selectServerError } from '../../redux/error/error.selectors';
import { createTask } from '../../redux/task/task.actions';

import type { Task, TaskCreation } from '../../redux/task/task.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Project } from '../../redux/project/project.flow-types';
import type { Error } from '../../redux/error/error.flow-types';

import './task-add.page.styles.scss';


type State = {
  subject: string,
  description: string,
  assignee: string,
  errors: Array<string>
};

type Props = {
  createTask: (newTask: TaskCreation, history: RouterHistory) => Task,
  history: RouterHistory,
  milestone: Milestone,
  project: Project,
  error: Error
};

const initialState = {
  subject: '',
  description: '',
  assignee: '',
  errors: [],
};

class TaskAdd extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      subject: '',
      description: '',
      assignee: '',
      errors: [],
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.error.message) {
      let { errors } = this.state;
      errors = [nextProps.error.message, ...errors];
      this.setState({ errors });
    }
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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
    const { subject, description, assignee } = this.state;
    // TODO: FIX THIS
    // eslint-disable-next-line no-shadow
    const { milestone, history, createTask } = this.props;
    if (isValid.length) {
      this.setState({ errors: isValid });
    } else {
      const newTask = {
        title: subject,
        milestoneID: milestone.id,
        description,
        assignedUserID: assignee,
      };
      createTask(newTask, history);
      this.setState(initialState);
    }
  };

  render() {
    const {
      subject, description, assignee, errors,
    } = this.state;
    const { milestone, project } = this.props;
    let participants;

    if (milestone) {
      participants = milestone.participants;
    } else {
      participants = [];
    }

    return (
      <div className="task-add">
        <Header>
          <div>
            <H1 className="mb05">
            Project:
              {' '}
              {project.title}
            </H1>
            <h2 className="heading-secondary">
            Milestone #2:
              {' '}
              {milestone.title}
            </h2>
          </div>
        </Header>
        <H1 className="mb05">Create Task</H1>
        <form onSubmit={this.handleSubmit} className="body">
          <div className="body__left">
            <Input
              label="Subject"
              placeholder="Placeholder text"
              onChange={this.handleChange}
              value={subject}
              name="subject"
              className="project__input"
            />
            <TextArea
              label="Description"
              name="description"
              value={description}
              onChange={this.handleChange}
              className="project__input"
            />
            <div className="select-wrapper">
              <h3 className="heading-tertiarry">Assignee</h3>
              <select
                className="select"
                name="assignee"
                value={assignee}
                onChange={this.handleChange}
                required
              >
                <option value="" disabled selected>
                  Not selected
                </option>
                {participants.length >= 1
                  ? participants.map((p) => (
                    <option key={p.id} value={`${p.id}`}>
                      {p.name}
                    </option>
                  ))
                  : null}
              </select>
            </div>
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
            <Button type="submit">
              Create
            </Button>
          </div>
          <div className="body__right" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  milestone: selectMilestoneByParams,
  project: selectProjectItem,
  error: selectServerError,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { createTask },
)(TaskAdd);
