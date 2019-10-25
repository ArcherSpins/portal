// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CREATE_PROJECT_ROUTE } from 'subApps/projects/routes';
import { H1, Button } from 'ui-kit';
import history from 'utils/history';
import ProjectItem from '../../components/project-item/project-item.component';
import type { Project } from '../../redux/project/project.flow-types';

import { getAllProjects } from '../../redux/project/project.actions';

import PaginationComponent from '../../components/pagination/pagination.component';

import './projects-page.styles.scss';

type State = {
  searchQuery: string,
  searchInTitle: boolean,
  searchInDesc: boolean,
  searchInMilestones: boolean,
  searchInTasks: boolean,
  searchMine: boolean,
  searchActive: boolean,
  type: string,
  model: string,
  activePage: number,
  participants: Array<Object>
};

type Props = {
  projects: Array<Project>,
  getAllProjects: () => Array<Project>
};

class Projects extends Component<Props, State> {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchInTitle: false,
      searchInDesc: false,
      searchInMilestones: false,
      searchInTasks: false,
      searchMine: false,
      searchActive: false,
      type: '',
      model: '',
      participants: [],
      activePage: 1,
    };
  }

  componentDidMount = (): void => {
    // TODO: FIX THIS!!!
    // eslint-disable-next-line no-shadow
    const { getAllProjects } = this.props;
    getAllProjects();
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleCheckboxChange = (e: SyntheticInputEvent<*>) => {
    const { name } = e.target;
    this.setState((state) => ({ [name]: !state[name] }));
  };

  handlePaginationChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };

  onNewProjectClick = () => {
    history.push(CREATE_PROJECT_ROUTE);
  }

  render() {
    const { activePage } = this.state;
    const { projects } = this.props;
    if (projects) {
      const filtered = projects;
      return (
        <div className="projects">
          <header className="projects__header">
            <H1>Projects</H1>
            <Button
              onClick={this.onNewProjectClick}
              use="transparent"
              size="sm"
            >
              Create new project
            </Button>
          </header>
          <div className="projects__middle">
            {filtered.length >= 1 && (
              <PaginationComponent
                activePage={activePage}
                totalItemsCount={filtered.length}
                itemsCountPerPage={10}
                onChange={this.handlePaginationChange}
              />
            )}
            <div className="projects__result-wrapper">
              <span className="projects__count">
                Projects:
                {' '}
                {filtered.length}
              </span>
            </div>
          </div>
          <div className="projects__tasks-field">
            {filtered
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(activePage * 10 - 10, activePage * 10)
              .map((p) => (
                <ProjectItem
                  key={p.id}
                  id={p.id}
                  spentTime={p.spentTime}
                  estimatedTime={p.estimatedTime}
                  createdAt={p.createdAt}
                  title={p.title}
                  description={p.description}
                  url={p.URL}
                  type={p.type.title}
                  engagement={p.engagementModel.title}
                  manager={`${p.manager.firstName} ${p.manager.lastName}`}
                  participants={p.participants}
                  watcher={p.watchers}
                />
              ))}
          </div>
        </div>
      );
    }
    return <div>Loading</div>;
  }
}

const mapStateToProps = ({ project: { projects } }) => ({
  projects,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { getAllProjects },
)(Projects);
