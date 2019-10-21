/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-prop-types */
// TODO: FIX
// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import Moment from 'react-moment';

import { Input, Button, TextArea } from 'ui-kit';
import { ROOT } from 'subApps/projects/routes';

import { editProject } from '../../redux/project/project.actions';
import {
  selectProjectItem,
  selectAllProjects,
  selectProjectLoadingBool,
} from '../../redux/project/project.selectors';
import { selectProjectsMolestones } from '../../redux/milestone/milestone.selectors';

import { getEstimation } from '../../graphql/queries/project.queries';

import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type {
  Project,
  ProjectCreation,
} from '../../redux/project/project.flow-types';

import translate from '../../helpers/translator';
import translateTitle from '../../helpers/translateTitle';
import { bindUserId, unbindUserId } from '../../helpers/compareArrays';
import { spentTimeInHours } from '../../helpers/sumTime';
import { getUrlFromProject } from '../../helpers';

import UserPicker from '../../components/user-picker/user-picker.component';
import RadioInputGroup from '../../components/forms/RadioInputGroup';
import SelectInput from '../../components/forms/select-input/select-input.component';

import './project-details-page.styles.scss';

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  name: string
};

type State = {
  id: string,
  createdAt: Date,
  title: string,
  url: string,
  type: string,
  engagement: string,
  manager: string,
  description: string,
  participants: Array<Employee>,
  watcher: Array<Employee>,
  errors: Array<string>,
  spentTime: number,
  estimatedTime: number
};

type Props = {
  project: Project,
  id: string,
  createdAt: string,
  title: string,
  url: string,
  type: string,
  engagement: string,
  manager: string,
  description: string,
  participants: Array<Employee>,
  watcher: Array<Employee>,
  projects: Array<Project>,
  history: RouterHistory,
  milestones: Array<Milestone>,
  editProject: (editProject: ProjectCreation, history: RouterHistory) => Project
};

const initialState = {
  id: '',
  createdAt: new Date(),
  title: '',
  url: '',
  type: '',
  engagement: '',
  manager: '',
  participants: [],
  watcher: [],
  description: '',
  estimatedTime: 0,
  spentTime: 0,
  errors: [],
};

class ProjectDetailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    console.log(props);
    this.state = {
      id: props.project.id,
      createdAt: props.project.createdAt,
      title: props.project.title,
      url: getUrlFromProject(props.project.URL),
      type: props.project.type.id,
      engagement: props.project.engagementModel.id,
      manager: props.project.manager.id,
      participants: props.project.participants,
      watcher: props.project.watchers,
      description: props.project.description,
      estimatedTime: props.project.estimatedTime,
      spentTime: props.project.spentTime,
      errors: [],
    };
  }

  componentDidMount = () => {
    getEstimation(this.props.project.id).then((response) => {
      const { estimatedTime, spentTime } = response.data.project;
      this.setState({ estimatedTime, spentTime });
    });
  };

  validate = () => {
    const {
      title, url, participants, watcher, type, engagement,
    } = this.state;
    const errors = [];

    if (!title) {
      errors.push('Title');
    }

    if (!url) {
      errors.push('Project URL');
    }

    if (participants.length <= 0) {
      errors.push('Participants Field');
    }

    if (watcher.length <= 0) {
      errors.push('Watcher Field');
    }

    if (!type) {
      errors.push('Project Type');
    }

    if (!engagement) {
      errors.push('Engagement Model');
    }

    this.props.projects.forEach((project) => {
      if (project.id !== this.props.project.id) {
        if (project.title.toLowerCase() === title.toLowerCase()) {
          errors.push('Title already exists');
        }
      }
    });

    return errors;
  };

  handleTitleChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ title: event.target.value }, () => {
      const { title } = this.state;
      if (title.length > 66) {
        this.setState({
          url: translate(translateTitle(title.substring(0, 66))),
        });
      } else {
        this.setState({
          url: translate(translateTitle(title)),
        });
      }
    });
  };

  handleUrlChange = (e: SyntheticInputEvent<*>) => {
    const url = translate(e.target.value);
    this.setState({ url });
  };

  getParticipants = (participants: Array<Employee>) => {
    this.setState({ participants });
  };

  getWatchers = (watchers: Array<Employee>) => {
    this.setState({ watcher: watchers });
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  deleteParticipant = (id: string) => {
    this.setState({
      participants: this.state.participants.filter((p) => p.id !== id),
    });
  };

  deleteWatcher = (id: string) => {
    this.setState({
      watcher: this.state.watcher.filter((p) => p.id !== id),
    });
  };

  showLogTime = () => {
    const hours = this.state.estimatedTime / 60;
    return Math.floor(hours);
  };

  handleSumbit = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    const isValid = this.validate();
    if (isValid.length > 0) {
      this.setState({ errors: isValid });
    } else {
      const {
        title,
        url,
        type,
        engagement,
        manager,
        participants,
        watcher,
        description,
        id,
      } = this.state;

      const watcherPropsIDs = this.props.project.watchers.map((w) => w.id.toString());
      const participantsPropsIDs = this.props.project.participants.map((p) => p.id.toString());
      const watcherIDs = watcher.map((w) => w.id.toString());

      const participantsIDs = participants.map((p) => p.id.toString());
      const editedProject = {
        id,
        title,
        URL: url,
        description,
        managerID: manager.toString(),
        engagementModel: engagement,
        type,
        unbindWatchers: unbindUserId(watcherPropsIDs, watcherIDs),
        bindWatchers: bindUserId(watcherPropsIDs, watcherIDs),
        unbindParticipants: unbindUserId(participantsPropsIDs, participantsIDs),
        bindParticipants: bindUserId(participantsPropsIDs, participantsIDs),
      };
      this.props.editProject(editedProject, this.props.history);
      this.setState(initialState);
    }
  };

  render() {
    const {
      title,
      url,
      manager,
      participants,
      watcher,
      description,
      createdAt,
      type,
      spentTime,
      engagement,
    } = this.state;
    return (
      <div className="cpp">
        <div className="project-details__header">
          <div className="project-details__title-container">
            <span className="project-details__project">Project:</span>
            <h1 style={{ marginBottom: 0 }} className="heading-primary">
              {title}
            </h1>
          </div>
        </div>
        <div className="project-details__sub-header">
          <Button
            use="grey"
            onClick={() => this.props.history.push(`${ROOT}/${url}/milestones`)}
          >
            Milestones
          </Button>
          <span className="project-details__spent">
            <b>Spent:</b>
            {' '}
            {spentTimeInHours(spentTime)}
/
            {this.showLogTime()}
h
          </span>
          <span className="project-details__spent">
            <b>Created:</b>
            <Moment format="DD/MM/YYYY">{createdAt}</Moment>
          </span>
        </div>
        <form className="cpp__form" onSubmit={this.handleSumbit}>
          <div style={{ width: '40%' }}>
            <TextArea
              className="cpp__description-input"
              label="Description"
              value={description}
              name="description"
              onChange={this.handleChange}
            />
          </div>
          <div style={{ marginRight: '5%', width: '40%' }}>
            <Input
              label="Title"
              name="title"
              type="text"
              value={title}
              onChange={this.handleTitleChange}
              className="project__input"
              required
              pattern="(?=.*[\p{L}]).{2,}"
              maxLength="100"
            />
            <Input
              name="url"
              type="text"
              label="Project URL"
              prefix={`${window.location.origin}/projects/`}
              value={url}
              onChange={this.handleUrlChange}
              className="project__input"
              required
              maxLength="66"
            />
            <p className="text-gray margin-bottom-md" style={{ width: '100%' }}>
              URL should be 1–100 characters length. Only lower case letters
              (a-z), numbers, dashes and underscores are alowed. Identifier
              should start with lowercase letter. Once saved identifier cannot
              be changed.
            </p>
            <div className="cpp__typesAndEngagement margin-bottom-lg">
              <div className="cpp__types">
                <h3 className="heading-tertiarry margin-right-md">
                  Project type
                </h3>
                <div className="cpp__types-inputs">
                  <RadioInputGroup
                    checked={type === 'a90ff7a3-37cb-4818-90e0-16c83be6f940'}
                    type="radio"
                    id="commercial"
                    name="type"
                    value="a90ff7a3-37cb-4818-90e0-16c83be6f940"
                    onChange={this.handleChange}
                    htmlFor="commercial"
                    spanText="Commercial"
                  />
                  <RadioInputGroup
                    checked={type === '26a5c423-e4f1-4194-a543-dd7f6cfbfb99'}
                    type="radio"
                    id="internal"
                    name="type"
                    value="26a5c423-e4f1-4194-a543-dd7f6cfbfb99"
                    onChange={this.handleChange}
                    htmlFor="internal"
                    spanText="Internal"
                  />
                </div>
              </div>
              <div className="cpp__engagement">
                <h3 className="heading-tertiarry margin-right-md">
                  Engagement Model
                </h3>
                <div className="cpp__engagement-inputs">
                  <RadioInputGroup
                    checked={
                      engagement === '7f535dd6-56b1-4979-a5ed-f471a535de21'
                    }
                    type="radio"
                    id="fixedPrice"
                    name="engagement"
                    value="7f535dd6-56b1-4979-a5ed-f471a535de21"
                    onChange={this.handleChange}
                    htmlFor="fixedPrice"
                    spanText="Fixed Price"
                  />
                  <RadioInputGroup
                    checked={
                      engagement === 'e4b36752-5acc-4ba5-886f-b5e4d86fe1e1'
                    }
                    type="radio"
                    id="hourly"
                    name="engagement"
                    value="e4b36752-5acc-4ba5-886f-b5e4d86fe1e1"
                    onChange={this.handleChange}
                    htmlFor="hourly"
                    spanText="Hourly"
                  />
                  <RadioInputGroup
                    checked={
                      engagement === '0bea1179-488d-4018-a200-1176bf9fd959'
                    }
                    type="radio"
                    id="fulltime"
                    name="engagement"
                    value="0bea1179-488d-4018-a200-1176bf9fd959"
                    onChange={this.handleChange}
                    htmlFor="fulltime"
                    spanText="Fixed Price + Hourly"
                  />
                </div>
              </div>
            </div>
            <SelectInput
              onChange={this.handleChange}
              name="manager"
              value={manager}
            />
            <UserPicker
              getUsers={this.getParticipants}
              title="Participants"
              deleteUser={this.deleteParticipant}
              users={participants}
            />
            <UserPicker
              getUsers={this.getWatchers}
              title="Watchers"
              deleteUser={this.deleteWatcher}
              users={watcher}
            />
            {this.state.errors.length >= 1 && (
              <div
                style={{
                  color: 'red',
                  margin: '5px',
                  fontSize: '14px',
                }}
              >
                Sorry, something went wrong please check
                {' '}
                {this.state.errors.join(', ')}
.
              </div>
            )}
            <div className="cpp__buttons-group">
              <Button
                type="submit"
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => this.props.history.goBack()}
                use="transparent"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  loading: selectProjectLoadingBool,
  project: selectProjectItem,
  projects: selectAllProjects,
  milestones: selectProjectsMolestones,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { editProject },
)(ProjectDetailPage);
