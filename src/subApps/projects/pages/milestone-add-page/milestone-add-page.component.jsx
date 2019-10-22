// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { RouterHistory } from 'react-router-dom';

import './milestone-add-page.styles.scss';

import { Input, TextArea, Button } from 'ui-kit';
import { createMilestone } from '../../redux/milestone/milestone.actions';

import { selectServerError } from '../../redux/error/error.selectors';
import { selectProjectItem } from '../../redux/project/project.selectors';
import type {
  Milestone,
  MilestoneCreation,
} from '../../redux/milestone/milestone.flow-types';
import type { Project } from '../../redux/project/project.flow-types';
import type { Error } from '../../redux/error/error.flow-types';

import UserPicker from '../../components/user-picker/user-picker.component';
import Header from '../../components/header';

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  name: string
};

type State = {
  title: string,
  participants: Array<Employee>,
  taskCreators: Array<Employee>,
  description: string,
  spent: string,
  errors: Array<string>
};

type Props = {
  createMilestone: (
    newMilestone: MilestoneCreation,
    history: RouterHistory
  ) => Milestone,
  // match: Match,
  history: RouterHistory,
  project: Project,
  error: Error
};

const initialState = {
  title: '',
  participants: [],
  taskCreators: [],
  description: '',
  spent: '',
  errors: [],
};

class MilestoneAddPage extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      title: '',
      participants: [],
      taskCreators: [],
      description: '',
      spent: '',
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

  handleSpentChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ spent: this.filterNumbers(e.target.value) });
  };

  filterNumbers = (term: string) => {
    const regex = new RegExp('^[0-9]*$');
    if (regex.test(term)) {
      return term;
    }
    return term.substring(0, term.length - 1);
  };

  deleteParticipant = (id: string) => {
    this.setState((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    }));
  };

  deleteCreator = (id: string) => {
    this.setState((state) => ({
      taskCreators: state.taskCreators.filter((p) => p.id !== id),
    }));
  };

  getParticipants = (participants: Array<Employee>) => {
    this.setState({ participants });
  };

  getCreator = (taskCreators: Array<Employee>) => {
    this.setState({ taskCreators });
  };

  validate = () => {
    const {
      title, participants, taskCreators, spent,
    } = this.state;
    const errors = [];

    if (!title) {
      errors.push('Title Field');
    }

    if (title.length > 100) {
      errors.push('Title Field');
    }

    if (participants.length <= 0) {
      errors.push('Participants Field');
    }

    if (taskCreators.length <= 0) {
      errors.push('Task Creators Field');
    }

    if (!spent) {
      errors.push('Spent Field');
    }

    return errors;
  };

  handleSubmit = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    const {
      title,
      taskCreators,
      participants,
      spent,
      description,
    } = this.state;
    // TODO: FIX THIS
    // eslint-disable-next-line no-shadow
    const { project, createMilestone, history } = this.props;
    const isValid = this.validate();

    if (isValid.length) {
      this.setState({ errors: isValid });
    } else {
      const taskCreatorsIDs = taskCreators.map((w) => w.id.toString());

      const participantIDs = participants.map((p) => p.id.toString());
      const newSpent = parseFloat(spent) * 60;
      const newMilestone = {
        title,
        description,
        estTime: newSpent.toString(),
        projectID: project.id || '',
        taskCreatorsIDs,
        participantIDs,
      };
      createMilestone(newMilestone, history);
      this.setState(initialState);
    }
  };

  render() {
    const {
      title,
      taskCreators,
      participants,
      description,
      spent,
      errors,
    } = this.state;
    const { history } = this.props;
    return (
      <div className="milestone-add">
        <Header>
          <h1 style={{ marginBottom: 0 }} className="heading-primary">
            Milestone:
            {' '}
            {title}
          </h1>
        </Header>
        <div className="sub-header">
          <div className="estimation-type-wrapper">
            <b className="estimation-type-title">Spent/Estimation</b>
            <span className="estimation-type-count">0 of</span>
            <input
              type="text"
              className="estimation-input"
              onChange={this.handleSpentChange}
              value={spent}
            />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="form">
          <div className="cpp__form-inputs">
            <div style={{ width: '45%' }}>
              <TextArea
                label="Description"
                value={description}
                name="description"
                labelClassName="cpp__textarea"
                className="project__input"
                onChange={this.handleChange}
              />
            </div>
            <div style={{ width: '45%' }}>
              <Input
                label="Milestone"
                name="title"
                type="text"
                value={title}
                onChange={this.handleChange}
                className="project__input"
                maxLength="100"
                required
              />
              <UserPicker
                getUsers={this.getParticipants}
                title="Participants"
                deleteUser={this.deleteParticipant}
                users={participants}
              />
              <UserPicker
                getUsers={this.getCreator}
                title="Task Creators"
                deleteUser={this.deleteCreator}
                users={taskCreators}
              />
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
            </div>
          </div>
          <div className="cpp__buttons-group">
            <Button
              type="submit"
            >
                Save
            </Button>
            <Button
              use="transparent"
              type="button"
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  project: selectProjectItem,
  error: selectServerError,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { createMilestone },
)(MilestoneAddPage);
