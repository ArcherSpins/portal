// @flow
import React, { Component, type AbstractComponent } from 'react';
import { connect } from 'react-redux';
import { TablePaginate, H2 } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import { DescriptionLeads } from '../../components';
import {
  fetchJobsForCurrentUser,
  fetchBlockingJobsCurrentUser,
} from '../../redux/actions';
import styles from './Home.module.scss';
import type { Props } from './type';
import './style.scss';

const createTestAttr = createTestContext('leads-home');

export const columns = [
  {
    Header: 'Job title',
    accessor: 'job_title',
  },
  {
    Header: 'Posted',
    accessor: 'posted',
  },
  {
    Header: 'Loaded',
    accessor: 'loaded',
  },
  {
    Header: 'Age',
    accessor: 'age',
  },
  {
    Header: 'Owner',
    accessor: 'owner',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
];

const data = [
  {
    job_title: 'Mobile app development',
    posted: '213213',
    loaded: '231232',
    age: '27d 3h',
    owner: 'Ivan Ivanchenko',
    status: 'Pending',
  },
];

export class Home extends Component<Props> {
  componentDidMount() {
    const { fetchJobsForCurrentUserAction } = this.props;
    fetchJobsForCurrentUserAction({
      from: new Date(2018, 11, 12).toISOString(),
      to: new Date().toISOString(),
    });
  }

  togglePaginate = () => {

  }

  render() {
    return (
      <div className={styles.home}>
        <div className="d-flex h-100 justify-content-between">
          <div className="col-6">
            <H2 className="title-gray_leads mb-2">Job Postings</H2>
            <TablePaginate
              classNameContainer="reverse-table-paginate"
              items={data}
              pageSize={6}
              getNumber={this.togglePaginate}
              columns={columns}
              activeIndex={1}
              count={Math.ceil(3)}
              // history={history}
              manual
              data-test={createTestAttr('leads__table')}
            />
          </div>
          <div className="col-6 ml-20">
            <H2 className="title-gray_leads mb-2 text-left">Description</H2>
            <DescriptionLeads />
            {/* <NotFindLeads /> */}
          </div>
        </div>
      </div>
    );
  }
}
//  d-flex justify-content-center align-items-center
const mapStateToProps = (state) => ({
  jobsForCurrentUser: state.jobsCurrentUser.jobsForCurrentUser,
});

const mapDispatchToProps = {
  fetchJobsForCurrentUserAction: fetchJobsForCurrentUser,
  fetchBlockingJobsCurrentUserAction: fetchBlockingJobsCurrentUser,
};

export default (connect(mapStateToProps, mapDispatchToProps)(Home): AbstractComponent<Props>);
