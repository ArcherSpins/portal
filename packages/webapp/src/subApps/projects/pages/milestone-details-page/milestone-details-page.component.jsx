/* eslint-disable react/no-unused-state */
// TODO: FIX THIS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { RouterHistory, Match } from 'react-router-dom';
import uniqBy from 'lodash.uniqby';
import {
  Input, Button, TextArea, H1, Participants,
  Dropdown,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import Header from 'subApps/projects/components/header';
// $FlowFixMe
import type { Option, Action } from '@sfxdx/ui-kit/src/Combobox';
// $FlowFixMe
import type { Action as ParticipantsAction } from '@sfxdx/ui-kit/src/Participants';

import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import {
  editMilestone,
  deleteMilestone,
} from '../../redux/milestone/milestone.actions';
// import { deleteTaskByMilestone } from "../../redux/task/task.actions";
// import { deleteLogByMilestone } from "../../redux/log/log.actions";

import { selectServerError } from '../../redux/error/error.selectors';
import { selectProjectItem } from '../../redux/project/project.selectors';
import { bindUserId, unbindUserId } from '../../helpers/compareArrays';
import { spentTimeInHours } from '../../helpers/sumTime';
import type {
  Milestone,
  MilestoneCreation,
} from '../../redux/milestone/milestone.flow-types';
import type { Error } from '../../redux/error/error.flow-types';
import type { Project } from '../../redux/project/project.flow-types';
import Modal from '../../components/modal/modal.component';

import './milestone-details-page.styles.scss';

const createTestAttr = createTestContext('milestone-details');

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  name: string
};

type State = {
  id: string,
  title: string,
  status: string,
  number: number,
  participants: Array<Option>,
  spentTime: number,
  estimatedTime: string | number,
  isShowing: boolean,
  description: string,
  errors: Array<string>
};

type Props = {
  milestone: Milestone,
  error: Error,
  editMilestone: (
    milestone: MilestoneCreation,
    history: RouterHistory
  ) => Milestone,
  deleteMilestone: (milestoneId: string, pushTo: () => void) => void,
  // deleteTaskByMilestone: (milestoneId: string) => void,
  // deleteLogByMilestone: (milestoneId: string) => void,
  history: RouterHistory,
  match: Match,
  project: Project,
};

const initialState = {
  id: '',
  title: '',
  status: '',
  participants: [],
  spentTime: 0,
  estimatedTime: 0,
  description: '',
  errors: [],
  isShowing: false,
};

class MilestoneDetailsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.milestone.id,
      number: props.milestone.number,
      title: props.milestone.title,
      status: props.milestone.state.title,
      participants: this.formatEmployees(props.milestone.participants),
      estimatedTime: props.milestone.estimatedTime / 60,
      spentTime: props.milestone.spentTime,
      description: props.milestone.description,
      errors: [],
      isShowing: false,
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

  handleSpentChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ estimatedTime: this.filterNumbers(e.target.value) });
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

  filterNumbers = (term: string) => {
    const regex = new RegExp('^[0-9]*$');
    if (regex.test(term)) {
      return term;
    }
    return term.substring(0, term.length - 1);
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validate = () => {
    const {
      title, participants, estimatedTime,
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

    if (!estimatedTime) {
      errors.push('Spent Field');
    }

    return errors;
  };

  handleSubmit = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    const {
      title,
      id,
      participants,
      estimatedTime,
      description,
    } = this.state;
    // eslint-disable-next-line no-shadow
    const { milestone, editMilestone, history } = this.props;
    const isValid = this.validate();
    if (isValid.length) {
      this.setState({ errors: isValid });
    } else {
      const participantsPropsIDs = milestone.participants.map((p) => p.id.toString());

      const participantsIDs = participants.map((p) => p.value.toString());
      const newEst = parseFloat(estimatedTime) * 60;
      const editedMilestone = {
        id,
        title,
        description,
        estTime: newEst.toString(),
        stateID: 'a9bfe6d2-9a5a-4dda-96b2-daeff3404a20',
        unbindParticipants: unbindUserId(participantsPropsIDs, participantsIDs),
        bindParticipants: bindUserId(participantsPropsIDs, participantsIDs),
      };

      editMilestone(editedMilestone, history);
      this.setState(initialState);
    }
  };

  deleteParticipant = (id: string) => {
    this.setState((state) => ({
      participants: state.participants.filter((p) => p.value !== id),
    }));
  };

  onDeleteClick = () => {
    const {
      // TODO: FIX THIS
      // eslint-disable-next-line no-shadow
      milestone, history, match, deleteMilestone,
    } = this.props;
    const { id } = milestone;
    const pushTo = () => {
      history.push(
        `/${match.params.projectId || ''}/milestones`,
      );
    };
    this.setState({ isShowing: false }, () => deleteMilestone(id, pushTo));
  };

  formatEmployees = (employees: Array<Employee>): Array<Option> => employees
    .map((em) => this.formatEmployee(em))


  formatEmployee = (employee: Employee): Option => ({
    id: employee.id,
    label: employee.name ? employee.name : `${employee.firstName} ${employee.lastName}`,
    value: employee.id,
  });

  onChipDelete = ({ name, value }: ParticipantsAction) => {
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
      estimatedTime,
      spentTime,
      description,
      errors,
      number,
      isShowing,
    } = this.state;
    const { history, match, project } = this.props;
    return (
      <div className="milestone-details">
        <Header className="">
          <H1>
            Milestone #
            {number || 'null'}
:
            {' '}
            {title}
          </H1>
          <Button
            type="button"
            use="danger"
            size="sm"
            onClick={this.openModalHandler}
            data-test={createTestAttr('delete-button')}
          >
            Delete Milestone
          </Button>
        </Header>
        <div className="sub-header">
          <Button
            type="button"
            size="sm"
            onClick={() => history.push(`${match.url || ''}/tasks`)}
            data-test={createTestAttr('tasks-button')}
          >
            Tasks
          </Button>
          <div className="estimation-type-wrapper">
            <b className="estimation-type-title">Spent/Estimation</b>
            <span className="estimation-type-count">
              {spentTimeInHours(spentTime)}
              {' '}
              of
            </span>
            <Input
              type="text"
              className="estimation-input"
              size="sm"
              onChange={this.handleSpentChange}
              value={estimatedTime}
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
                onChange={this.handleChange}
                data-test={createTestAttr('description-input')}
              />
            </div>
            <div style={{ width: '45%' }}>
              <Input
                label="Milestone"
                name="title"
                type="text"
                className="project__input"
                value={title}
                maxLength="100"
                onChange={this.handleChange}
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
          </div>
        </form>
        {isShowing ? (
          // TODO: FIX THIS
          // eslint-disable-next-line
          <div onClick={this.closeModalHandler} className="back-drop" />
        ) : null}
        <Modal
          className="modal"
          show={isShowing}
          close={this.closeModalHandler}
          object="Milestone"
          func={this.onDeleteClick}
        >
          Are you sure you want to delete?
        </Modal>
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
  {
    editMilestone,
    deleteMilestone,
    // deleteTaskByMilestone,
    // deleteLogByMilestone
  },
)(MilestoneDetailsPage);
