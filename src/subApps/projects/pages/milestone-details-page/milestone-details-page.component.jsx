/* eslint-disable react/no-unused-state */
// TODO: FIX THIS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { RouterHistory, Match } from 'react-router-dom';

import './milestone-details-page.styles.scss';

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

import TextInput from '../../components/forms/text-input/text-input.component';
import UserPicker from '../../components/user-picker/user-picker.component';
import InversButton from '../../components/inverse-button/inverse-button.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import CustomTextarea from '../../components/forms/custom-textarea/custom-textarea.component';
import Modal from '../../components/modal/modal.component';

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
  taskCreators: Array<Employee>,
  participants: Array<Employee>,
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
  match: Match
};

const initialState = {
  id: '',
  title: '',
  status: '',
  taskCreators: [],
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
      taskCreators: props.milestone.taskCreators,
      participants: props.milestone.participants,
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
      title, participants, taskCreators, estimatedTime,
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
      taskCreators,
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
      const taskCreatorsPropsIDs = milestone.taskCreators.map((w) => w.id.toString());
      const participantsPropsIDs = milestone.participants.map((p) => p.id.toString());
      const taskCreatorsIDs = taskCreators.map((w) => w.id.toString());

      const participantsIDs = participants.map((p) => p.id.toString());
      const newEst = parseFloat(estimatedTime) * 60;
      const editedMilestone = {
        id,
        title,
        description,
        estTime: newEst.toString(),
        stateID: 'a9bfe6d2-9a5a-4dda-96b2-daeff3404a20',
        unbindTaskCreators: unbindUserId(taskCreatorsPropsIDs, taskCreatorsIDs),
        bindTaskCreators: bindUserId(taskCreatorsPropsIDs, taskCreatorsIDs),
        unbindParticipants: unbindUserId(participantsPropsIDs, participantsIDs),
        bindParticipants: bindUserId(participantsPropsIDs, participantsIDs),
      };

      editMilestone(editedMilestone, history);
      this.setState(initialState);
    }
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

  render() {
    const {
      title,
      taskCreators,
      participants,
      estimatedTime,
      spentTime,
      description,
      errors,
      number,
      isShowing,
    } = this.state;
    const { history, match } = this.props;
    return (
      <div className="milestone-details">
        <div className="header">
          <h1 style={{ marginBottom: 0 }} className="heading-primary">
            Milestone #
            {number || 'null'}
:
            {' '}
            {title}
          </h1>
          <InversButton
            type="button"
            color="danger"
            onClick={this.openModalHandler}
          >
            Delete Milestone
          </InversButton>
        </div>
        <div className="sub-header">
          <InversButton
            type="button"
            color="success"
            onClick={() => history.push(`${match.url || ''}/tasks`)}
          >
            Tasks
          </InversButton>
          <div className="estimation-type-wrapper">
            <b className="estimation-type-title">Spent/Estimation</b>
            <span className="estimation-type-count">
              {spentTimeInHours(spentTime)}
              {' '}
of
            </span>
            <input
              type="text"
              className="estimation-input"
              onChange={this.handleSpentChange}
              value={estimatedTime}
            />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="form">
          <div style={{ width: '45%' }}>
            <TextInput
              header="Milestone"
              name="title"
              type="text"
              value={title}
              maxLength="100"
              onChange={this.handleChange}
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
            <CustomButton color="success" type="submit">
              Save
            </CustomButton>
          </div>
          <div style={{ width: '45%' }}>
            <CustomTextarea
              header="Description"
              className="description"
              value={description}
              name="description"
              onChange={this.handleChange}
            />
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
