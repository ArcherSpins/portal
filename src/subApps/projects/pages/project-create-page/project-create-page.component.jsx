/* eslint-disable react/no-unused-state */
// TODO: FIX THIS
// @flow
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import {
  Input, TextArea, Button, Radio, H1,
} from 'ui-kit';
import Header from 'subApps/projects/components/header';
import { saveProject, getProjectTypes } from '../../redux/project/project.actions';
import translate from '../../helpers/translator';
import emoveSpecial from '../../helpers/removeSpecial';
import translateTitle from '../../helpers/translateTitle';

import {
  selectAllProjects,
  selectProjectLoadingBool,
  selectEngagementModels,
  selectProjectTypes,
} from '../../redux/project/project.selectors';

import type {
  Project,
  ProjectCreation,
  ProjectType,
} from '../../redux/project/project.flow-types';

import UserPicker from '../../components/user-picker/user-picker.component';
import SelectInput from '../../components/forms/select-input/select-input.component';

import './project-create-page.styles.scss';

type Employee = {
  id: string,
  firstName: string,
  lastName: string,
  name: string
};

type State = {
  title: string,
  URL: string,
  type: string,
  engagementModel: string,
  managerID: string,
  description: string,
  participantName: string,
  watcherName: string,
  filteredUsers: Array<Employee>,
  participants: Array<Employee>,
  watchers: Array<Employee>,
  errors: Array<string>
};

type Props = {
  history: RouterHistory,
  saveProject: (project: ProjectCreation, history: RouterHistory) => Project,
  projectTypes: Array<ProjectType>,
  engagementModels: Array<ProjectType>,
  getProjectTypes: () => void,
};

const initialState = {
  filteredUsers: [],
  title: '',
  URL: '',
  type: 'a90ff7a3-37cb-4818-90e0-16c83be6f940',
  engagementModel: '7f535dd6-56b1-4979-a5ed-f471a535de21',
  managerID: '',
  participants: [],
  watchers: [],
  participantName: '',
  watcherName: '',
  description: '',
  errors: [],
};

class CreateProjectPage extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      title: '',
      URL: '',
      type: 'a90ff7a3-37cb-4818-90e0-16c83be6f940',
      engagementModel: '7f535dd6-56b1-4979-a5ed-f471a535de21',
      managerID: '',
      participants: [],
      watchers: [],
      participantName: '',
      watcherName: '',
      description: '',
      errors: [],
    };
  }

  componentDidMount() {
    const { getProjectTypes: fetchProjectTypes } = this.props;
    fetchProjectTypes();
  }

  validate = () => {
    const {
      title,
      URL,
      participants,
      watchers,
      type,
      engagementModel,
    } = this.state;
    const errors = [];

    if (title.length < 1) {
      errors.push('Title Field');
    }

    if (URL.length < 1) {
      errors.push('Project URL');
    }

    if (URL.length > 66) {
      errors.push("Project URL can't be longer than 100 characters");
    }

    if (participants.length <= 0) {
      errors.push('Participants Field');
    }

    if (watchers.length <= 0) {
      errors.push('Watcher Field');
    }

    if (!type) {
      errors.push('Project Type');
    }

    if (!engagementModel) {
      errors.push('Engagement Model');
    }

    // this.props.projects.forEach(project => {
    //   if (project.title.toLowerCase() === title.toLowerCase()) {
    //     errors.push("Title already exists");
    //   }
    // });

    return errors;
  };

  handleTitleChange = (event: SyntheticInputEvent<*>) => {
    this.setState({ title: event.target.value }, () => {
      const { title } = this.state;
      if (title.length > 66) {
        this.setState({
          URL: translate(translateTitle(title.substring(0, 66))),
        });
      } else {
        this.setState({
          URL: translate(translateTitle(title)),
        });
      }
    });
  };

  handleUrlChange = (event: SyntheticInputEvent<*>) => {
    const URL = translate(event.target.value);
    this.setState({ URL });
  };

  handleChange = (event: SyntheticInputEvent<*>) => {
    if (
      event.target.name === 'participantName'
      || event.target.name === 'watcherName'
    ) {
      this.setState({ [event.target.name]: emoveSpecial(event.target.value) });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
  };

  setFirstManager = (id: string) => {
    this.setState({ managerID: id });
  };

  deleteParticipant = (id: string) => {
    this.setState((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    }),
    () => {
      this.setState({});
    });
  };

  deleteWatcher = (id: string) => {
    this.setState((state) => ({
      watchers: state.watchers.filter((p) => p.id !== id),
    }));
  };

  handleSumbit = (event: SyntheticInputEvent<*>) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid.length > 0) {
      this.setState({ errors: isValid });
    } else {
      const {
        title,
        URL,
        type,
        engagementModel,
        managerID,
        participants,
        watchers,
        description,
      } = this.state;
      // TODO: FIX THIS
      // eslint-disable-next-line no-shadow
      const { saveProject, history } = this.props;
      const watcherIDs = watchers.map((w) => w.id.toString());

      const participantsIDs = participants.map((p) => p.id.toString());
      const newProject = {
        title,
        URL,
        description,
        managerID: managerID.toString(),
        engagementModel,
        type,
        watchers: watcherIDs,
        participants: participantsIDs,
      };
      saveProject(newProject, history);
      this.setState(initialState);
      // this.props.history.push("/");
    }
  };

  getParticipants = (participants: Array<Employee>) => {
    this.setState({ participants });
  };

  getWatchers = (watchers: Array<Employee>) => {
    this.setState({ watchers });
  };

  render() {
    const {
      title,
      URL,
      managerID,
      participants,
      watchers,
      description,
      errors,
      type,
      engagementModel,
    } = this.state;
    const { projectTypes, engagementModels, history } = this.props;
    return (
      <div className="cpp">
        <Header>
          <div className="project-details__title-container">
            <H1>
              Create New Project
            </H1>
          </div>
        </Header>
        <form className="cpp__form" onSubmit={this.handleSumbit}>
          <div className="cpp__form-inputs">
            <div style={{ width: '40%' }}>
              <TextArea
                label="Description"
                value={description}
                name="description"
                labelClassName="cpp__textarea"
                className="project__input"
                onChange={this.handleChange}
              />
            </div>
            <div style={{ marginRight: '5%', width: '40%' }}>
              <Input
                name="title"
                type="text"
                label="Title"
                className="project__input"
                value={title}
                onChange={this.handleTitleChange}
                required
                maxLength="100"
                pattern="(?=.*[\p{L}]).{2,}"
              />
              <div className="url-wrapper">
                <Input
                  name="URL"
                  label="Project URL"
                  type="text"
                  className="project__input"
                  prefix={`${window.location.origin}/projects/`}
                  value={URL}
                  onChange={this.handleUrlChange}
                  required
                  maxLength="66"
                />
              </div>
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
                    {projectTypes.map((pr) => (
                      <Radio
                        checked={type === pr.id}
                        type="radio"
                        id={pr.title}
                        key={pr.id}
                        name="type"
                        value={pr.id}
                        onChange={this.handleChange}
                        htmlFor={pr.title}
                        spanText={pr.title}
                      />
                    ))}
                  </div>
                </div>
                <div className="cpp__engagement">
                  <h3 className="heading-tertiarry margin-right-md">
                  Engagement Model
                  </h3>
                  <div className="cpp__engagement-inputs">
                    {engagementModels.map((model) => (
                      <Radio
                        checked={
                          engagementModel === model.id
                        }
                        type="radio"
                        id={model.title}
                        key={model.id}
                        name="engagementModel"
                        value={model.id}
                        onChange={this.handleChange}
                        htmlFor={model.title}
                        spanText={model.title}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <SelectInput
                onChange={this.handleChange}
                name="managerID"
                value={managerID}
                setFirstUser={this.setFirstManager}
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
                users={watchers}
              />
              {Array.isArray(errors) && errors.length >= 1 && (
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
                Create
            </Button>
            <Button
              type="button"
              use="transparent"
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
  projects: selectAllProjects,
  loading: selectProjectLoadingBool,
  projectTypes: selectProjectTypes,
  engagementModels: selectEngagementModels,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { saveProject, getProjectTypes },
)(CreateProjectPage);
