/* eslint-disable no-shadow */
// TODO: FIX THIS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { Match } from 'react-router-dom';
import { selectProjectsMolestones } from '../../redux/milestone/milestone.selectors';
import { selectProjectItem } from '../../redux/project/project.selectors';
import { getAllMilestones } from '../../redux/milestone/milestone.actions';

import './milestones-page.styles.scss';

import MilestoneItem from '../../components/milestone-item/milestone-item.component';
import LinkButton from '../../components/link-button/link-button.component';
import PaginationComponent from '../../components/pagination/pagination.component';

import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Project } from '../../redux/project/project.flow-types';

type State = {
  openDescription: boolean,
  activePage: number
};

type Props = {
  milestones: Array<Milestone>,
  project: Project,
  match: Match,
  getAllMilestones: (id: string) => Array<Milestone>
};

class MilestonePage extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      openDescription: false,
      activePage: 1,
    };
  }

  componentDidMount = (): void => {
    const { getAllMilestones, project } = this.props;
    getAllMilestones(project.id);
  };

  handlePaginationChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { openDescription, activePage } = this.state;
    const { milestones, project, match } = this.props;
    return (
      <div className="milestones">
        <header className="milestones__header">
          <span className="milestones__project">Project:</span>
          <h1 style={{ margin: 0 }} className="heading-primary">
            {project.title}
          </h1>
        </header>
        <div className="milestones__line" />
        <div className="milestones__body">
          <div className="milestones__subheader">
            <div className="milestones__subheader-left">
              <h3
                style={{ fontSize: '2em' }}
                className="milestones__subheader-title"
              >
                Milestone
              </h3>
              <div className="milestones__sort">
                <button
                  type="button"
                  className={`${
                    !openDescription ? 'active' : ''
                  } milestones__subheader-sort`}
                  onClick={() => this.setState({ openDescription: false })}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.33333 0.666829H12V2.00016H3.33333V0.666829ZM0 0.333496H2V2.3335H0V0.333496ZM0 5.00016H2V7.00016H0V5.00016ZM0 9.66683H2V11.6668H0V9.66683ZM3.33333 5.3335H12V6.66683H3.33333V5.3335ZM3.33333 10.0002H12V11.3335H3.33333V10.0002Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className={`${
                    openDescription ? 'active' : ''
                  } milestones__subheader-sort`}
                  onClick={() => this.setState({ openDescription: true })}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.33333 0.666504H12V1.99984H5.33333V0.666504ZM5.33333 3.33317H9.33333V4.6665H5.33333V3.33317ZM5.33333 7.33317H12V8.6665H5.33333V7.33317ZM5.33333 9.99984H9.33333V11.3332H5.33333V9.99984ZM0 0.666504H4V4.6665H0V0.666504ZM1.33333 1.99984V3.33317H2.66667V1.99984H1.33333ZM0 7.33317H4V11.3332H0V7.33317ZM1.33333 8.6665V9.99984H2.66667V8.6665H1.33333Z"
                      fill="black"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <LinkButton to={`${match.url}/create`}>
              Add Milestone
            </LinkButton>
          </div>
          {milestones.length >= 1 && (
            <PaginationComponent
              activePage={activePage}
              totalItemsCount={milestones.length}
              itemsCountPerPage={10}
              onChange={this.handlePaginationChange}
            />
          )}
          <div className="milestones__list-wrapper">
            <div className="milestones__list-header">
              <span className="list-header-item">#</span>
              <span className="list-header-item">Milestone</span>
              <span className="list-header-item">Spent/Estimation</span>
              <span className="list-header-item">Status</span>
            </div>
            <div className="milestones__list">
              {milestones.length > 0
                ? milestones
                  .slice(activePage * 10 - 10, activePage * 10)
                  .map((m) => (
                    <MilestoneItem
                      openDescription={openDescription}
                      id={m.id}
                      number={m.number}
                      title={m.title}
                      estimatedTime={m.estimatedTime}
                      spentTime={m.spentTime}
                      status={m.state.title}
                      description={m.description}
                      key={m.id}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  milestones: selectProjectsMolestones,
  project: selectProjectItem,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { getAllMilestones },
)(MilestonePage);
