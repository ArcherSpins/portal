// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import uniqBy from 'lodash.uniqby';
import type { RouterHistory } from 'react-router-dom';

import './milestone-add-page.styles.scss';

import {
  Input, TextArea, Button, H1, Participants,
  Dropdown,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
// $FlowFixMe
import type { Option, Action } from '@sfxdx/ui-kit/src/Combobox';

import { createMilestone } from '../../redux/milestone/milestone.actions';

import { selectServerError } from '../../redux/error/error.selectors';
import { selectProjectItem } from '../../redux/project/project.selectors';
import type {
  Milestone,
  MilestoneCreation,
} from '../../redux/milestone/milestone.flow-types';
import type { Project } from '../../redux/project/project.flow-types';
import type { Error } from '../../redux/error/error.flow-types';

import Header from '../../components/header';

const createTestAttr = createTestContext('milestone-add');

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  name: string
};

type State = {
  title: string,
  participants: Array<Option>,
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
      participants: state.participants.filter((p) => p.value !== id),
    }));
  };

  validate = () => {
    const {
      title, participants, spent,
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

    if (!spent) {
      errors.push('Spent Field');
    }

    return errors;
  };

  handleSubmit = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    const {
      title,
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
      const participantIDs = participants.map((p) => p.value.toString());
      const newSpent = parseFloat(spent) * 60;
      const newMilestone = {
        title,
        description,
        estTime: newSpent.toString(),
        projectID: project.id || '',
        participantIDs,
      };
      createMilestone(newMilestone, history);
      this.setState(initialState);
    }
  };

  formatEmployees = (employees: Array<Employee>): Array<Option> => employees
    .map((em) => this.formatEmployee(em))


  formatEmployee = (employee: Employee): Option => ({
    id: employee.id,
    label: employee.name ? employee.name : `${employee.firstName} ${employee.lastName}`,
    value: employee.id,
  });

  onChipDelete = ({ name, value }: Action) => {
    this.setState((state) => ({
      [name]: state[name].filter((item) => item.id !== value),
    }));
  }

  handleChipInputChange = (option: Option, { name }: Action) => {
    if (name) {
      this.setState((state) => ({
        [name]: uniqBy([...state[name], option], (e) => e.id),
      }));
    }
  }

  render() {
    const {
      title,
      participants,
      description,
      spent,
      errors,
    } = this.state;
    const { history, project } = this.props;
    return (
      <div className="milestone-add">
        <Header>
          <H1>
            Milestone:
            {' '}
            {title}
          </H1>
        </Header>
        <div className="sub-header">
          <div className="estimation-type-wrapper">
            <b className="estimation-type-title">Spent/Estimation</b>
            <span className="estimation-type-count">0 of</span>
            <Input
              type="text"
              size="sm"
              className="estimation-input"
              onChange={this.handleSpentChange}
              value={spent}
              data-test={createTestAttr('estimation-input')}
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
                data-test={createTestAttr('description-input')}
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
                data-test={createTestAttr('title-input')}
              />
              <Participants
                chips={participants}
                onDelete={this.onChipDelete}
                name="participants"
                data-test={createTestAttr('participants-wrap')}
              >
                <Dropdown
                  onChange={this.handleChipInputChange}
                  name="participants"
                  options={this.formatEmployees(project.participants)}
                  required
                  placeholder="Select"
                  className="mb05"
                  dataTest={createTestAttr('participants-select')}
                />
              </Participants>
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
              data-test={createTestAttr('save-button')}
            >
                Save
            </Button>
            <Button
              use="transparent"
              type="button"
              onClick={() => history.goBack()}
              data-test={createTestAttr('cancel-button')}
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
