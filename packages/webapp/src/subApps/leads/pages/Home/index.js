// @flow
import React, { Component, type AbstractComponent } from 'react';
import { connect } from 'react-redux';
import { TablePaginate, H2 } from '@sfxdx/ui-kit';
import styles from './Home.module.scss';
import './style.scss';

type OwnProps = {||};

type Props = {|
  ...OwnProps
|};

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

export class Home extends Component<Props> {
  render() {
    return (
      <div className={styles.home}>
        <div className="d-flex justify-content-between">
          <div className="col-6">
            <H2 className="title-gray_leads mb-1">Job Postings</H2>
            <TablePaginate
              classNameContainer="reverse-table-paginate"
              items={[].map((item) => ({
                // url: `${EMPLOYEES_ROUTE}/${item.id}`,
                name: item.name,
                department: item.department ? item.department.title : 'Not department',
                position: item.position ? item.position.title : 'Not position',
                location: `${(item.city.name || 'Not city, ')} ${(item.city.country || 'not country')}`,
              }))}
              pageSize={6}
              getNumber={this.togglePaginate}
              columns={columns}
              activeIndex={1}
              count={Math.ceil(3)}
              // history={history}
              manual
              data-test="leads__table"
            />
          </div>
          <div className="col-6">
            <H2 className="title-gray_leads mb-1 text-left">Description</H2>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default (connect(mapStateToProps, mapDispatchToProps)(Home): AbstractComponent<OwnProps>);
