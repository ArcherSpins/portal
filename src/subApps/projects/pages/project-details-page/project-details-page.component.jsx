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
import uniqBy from 'lodash.uniqby';
import {
  Input, Button, TextArea,
  Radio, H1, Combobox, Participants,
} from 'ui-kit';
import type { Action as ParticipantsAction } from 'ui-kit/Participants';
import Header from 'subApps/projects/components/header';

import { ROOT } from 'subApps/projects/routes';

import type { Option, Action } from 'ui-kit/Combobox';
import { editProject, getProjectTypes } from '../../redux/project/project.actions';
import {
  selectProjectItem,
  selectAllProjects,
  selectProjectLoadingBool,
  selectProjectTypes,
  selectEngagementModels,
} from '../../redux/project/project.selectors';
import { selectProjectsMolestones } from '../../redux/milestone/milestone.selectors';

import { getEstimation } from '../../graphql/queries/project.queries';
import { getEmployees } from '../../graphql/queries/employess.queries';

import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type {
  Project,
  ProjectCreation,
  ProjectType,
} from '../../redux/project/project.flow-types';
import translate from '../../helpers/translator';
import translateTitle from '../../helpers/translateTitle';
import { bindUserId, unbindUserId } from '../../helpers/compareArrays';
import { spentTimeInHours } from '../../helpers/sumTime';
import { getUrlFromProject } from '../../helpers';
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
  manager: Option,
  description: string,
  participants: Array<Option>,
  watchers: Array<Option>,
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
  manager: ?Employee,
  description: string,
  participants: Array<Employee>,
  watcher: Array<Employee>,
  projects: Array<Project>,
  history: RouterHistory,
  milestones: Array<Milestone>,
  projectTypes: Array<ProjectType>,
  engagementModels: Array<ProjectType>,
  getProjectTypes: () => void,
  editProject: (editProject: ProjectCreation, history: RouterHistory) => Project
};

const initialState = {
  id: '',
  createdAt: new Date(),
  title: '',
  url: '',
  type: '',
  engagement: '',
  participants: [],
  watchers: [],
  description: '',
  estimatedTime: 0,
  spentTime: 0,
  errors: [],
};

class ProjectDetailPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: props.project.id,
      createdAt: props.project.createdAt,
      title: props.project.title,
      url: getUrlFromProject(props.project.URL),
      type: props.project.type.id,
      engagement: props.project.engagementModel.id,
      manager: this.formatEmployee(props.project.manager),
      participants: this.formatEmployees(props.project.participants),
      watchers: this.formatEmployees(props.project.watchers),
      description: props.project.description,
      estimatedTime: props.project.estimatedTime,
      spentTime: props.project.spentTime,
      errors: [],
    };
  }

  componentDidMount = () => {
    const { getProjectTypes: fetchProjects } = this.props;
    fetchProjects();
    getEstimation(this.props.project.id).then((response) => {
      const { estimatedTime, spentTime } = response.data.project;
      this.setState({ estimatedTime, spentTime });
    });
  };

  validate = () => {
    const {
      title, url, participants, watchers, type, engagement,
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

    if (watchers.length <= 0) {
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

  handleChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleProjectsChange = (
    option: Option,
    e: Action,
  ) => {
    if (e.name) {
      this.setState({
        [e.name]: option,
      });
    }
  }

  handleChipInputChange = (option: Option, { name }: Action) => {
    if (name) {
      this.setState((state) => ({
        [name]: uniqBy([...state[name], option], (e) => e.id),
      }));
    } else {
      throw new Error('define name prop to combobox');
    }
  }

  deleteParticipant = (id: string) => {
    this.setState({
      participants: this.state.participants.filter((p) => p.id !== id),
    });
  };

  deleteWatcher = (id: string) => {
    this.setState({
      watchers: this.state.watchers.filter((p) => p.id !== id),
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
        watchers,
        description,
        id,
      } = this.state;

      const watcherPropsIDs = this.props.project.watchers.map((w) => w.id.toString());
      const participantsPropsIDs = this.props.project.participants.map((p) => p.id.toString());
      const watcherIDs = watchers.map((w) => w.id.toString());

      const participantsIDs = participants.map((p) => p.id.toString());
      const editedProject = {
        id,
        title,
        URL: url,
        description,
        managerID: manager.id.toString(),
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

  loadEmployees = async (value: string) => {
    const employees = await getEmployees(value);
    return this.formatEmployees(employees.data.employees.employees);
  }

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

  render() {
    const {
      title,
      url,
      manager,
      description,
      createdAt,
      type,
      spentTime,
      engagement,
      watchers,
      participants,
    } = this.state;
    const { projectTypes, engagementModels } = this.props;
    return (
      <div className="cpp">
        <Header>
          <div className="project-details__title-container">
            <span className="project-details__project">Project:</span>
            <H1>
              {title}
            </H1>
          </div>
        </Header>
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
          <div className="cpp__form-inputs">
            <div style={{ width: '40%' }}>
              <TextArea
                labelClassName="cpp__textarea"
                className="project__input"
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
                          engagement === model.id
                        }
                        type="radio"
                        id={model.title}
                        key={model.id}
                        name="engagement"
                        value={model.id}
                        onChange={this.handleChange}
                        htmlFor={model.title}
                        spanText={model.title}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <Combobox
                onChange={this.handleProjectsChange}
                loadOptions={this.loadEmployees}
                name="manager"
                value={manager}
                selectedOption={manager}
                label="Project Manager"
                className="mb1"
              />

              <Participants
                chips={participants}
                onDelete={this.onChipDelete}
                name="participants"
              >
                <Combobox
                  loadOptions={this.loadEmployees}
                  onChange={this.handleChipInputChange}
                  name="participants"
                  label="Participants"
                  className="mb05"
                />
              </Participants>
              <Participants
                chips={watchers}
                onDelete={this.onChipDelete}
                name="watchers"
              >
                <Combobox
                  loadOptions={this.loadEmployees}
                  onChange={this.handleChipInputChange}
                  name="watchers"
                  label="Watchers"
                  className="mb1"
                />
              </Participants>
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
            </div>
          </div>
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
  projectTypes: selectProjectTypes,
  engagementModels: selectEngagementModels,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { editProject, getProjectTypes },
)(ProjectDetailPage);
