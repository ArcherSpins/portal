// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Header from 'subApps/projects/components/header';
import {
  Input, TextArea, Button, H1, Dropdown,
} from 'ui-kit';
import type { Option, Action } from 'ui-kit/Combobox';

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
  assignee: Option,
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
  assignee: {
    value: '',
    label: 'Not assigned',
  },
  errors: [],
};

class TaskAdd extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = initialState;
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

  validate = (): Array<string> => {
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
    if (isValid.length > 0) {
      this.setState({ errors: isValid });
    } else {
      const newTask = {
        title: subject,
        milestoneID: milestone.id,
        description,
        assignedUserID: assignee.value,
      };
      createTask(newTask, history);
      this.setState(initialState);
    }
  };

  handleDropdownChange = (option: Option, { name }: Action) => {
    if (name) {
      this.setState({
        [name]: option,
      });
    }
  }

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
              <Dropdown
                value={assignee}
                onChange={this.handleDropdownChange}
                name="assignee"
                options={participants.map((p) => ({ value: p.id, label: p.name }))}
                required
              />
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
