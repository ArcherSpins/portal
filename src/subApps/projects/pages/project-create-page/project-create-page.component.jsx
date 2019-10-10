/* eslint-disable react/no-unused-state */
// TODO: FIX THIS
// @flow
import React, { Component } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { saveProject } from '../../redux/project/project.actions';
import translate from '../../helpers/translator';
import emoveSpecial from '../../helpers/removeSpecial';
import translateTitle from '../../helpers/translateTitle';

import {
  selectAllProjects,
  selectProjectLoadingBool,
} from '../../redux/project/project.selectors';

import type {
  Project,
  ProjectCreation,
} from '../../redux/project/project.flow-types';

import TextInput from '../../components/forms/text-input/text-input.component';
import UserPicker from '../../components/user-picker/user-picker.component';
import RadioInputGroup from '../../components/forms/RadioInputGroup';
import CustomButton from '../../components/custom-button/custom-button.component';
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
  saveProject: (project: ProjectCreation, history: RouterHistory) => Project
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
        URL: `http://projects.internal.sfxdx.ru/${URL}`,
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
    } = this.state;
    const { history } = this.props;
    return (
      <div className="cpp">
        <form className="cpp__form" onSubmit={this.handleSumbit}>
          <div style={{ width: '40%' }}>
            <h3 className="heading-tertiarry">Description</h3>
            <textarea
              className="cpp__description-input"
              value={description}
              name="description"
              onChange={this.handleChange}
            />
          </div>
          <div style={{ marginRight: '5%', width: '40%' }}>
            <h1 className="heading-primary ">Create New Project</h1>
            <TextInput
              header="Title"
              name="title"
              type="text"
              value={title}
              onChange={this.handleTitleChange}
              required
              maxLength="100"
              pattern="(?=.*[\p{L}]).{2,}"
            />
            <h3 className="heading-tertiarry">Project URL</h3>
            <div className="url-wrapper">
              <span className="url-link">
                http://projects.internal.sfxdx.ru/
              </span>
              <TextInput
                name="URL"
                type="text"
                value={URL}
                onChange={this.handleUrlChange}
                className="cpp__url"
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
                  <RadioInputGroup
                    checked
                    type="radio"
                    id="commercial"
                    name="type"
                    value="a90ff7a3-37cb-4818-90e0-16c83be6f940"
                    onChange={this.handleChange}
                    htmlFor="commercial"
                    spanText="Commercial"
                  />
                  <RadioInputGroup
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
                    checked
                    type="radio"
                    id="fixedPrice"
                    name="engagementModel"
                    value="7f535dd6-56b1-4979-a5ed-f471a535de21"
                    onChange={this.handleChange}
                    htmlFor="fixedPrice"
                    spanText="Fixed Price"
                  />
                  <RadioInputGroup
                    type="radio"
                    id="hourly"
                    name="engagementModel"
                    value="e4b36752-5acc-4ba5-886f-b5e4d86fe1e1"
                    onChange={this.handleChange}
                    htmlFor="hourly"
                    spanText="Hourly"
                  />
                  <RadioInputGroup
                    type="radio"
                    id="fulltime"
                    name="engagementModel"
                    value="0bea1179-488d-4018-a200-1176bf9fd959"
                    onChange={this.handleChange}
                    htmlFor="fulltime"
                    spanText="Fulltime"
                  />
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
            <div className="cpp__buttons-group">
              <CustomButton type="submit" color="success">
                Create
              </CustomButton>
              <CustomButton
                type="button"
                onClick={() => history.goBack()}
              >
                Cancel
              </CustomButton>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  projects: selectAllProjects,
  loading: selectProjectLoadingBool,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { saveProject },
)(CreateProjectPage);
