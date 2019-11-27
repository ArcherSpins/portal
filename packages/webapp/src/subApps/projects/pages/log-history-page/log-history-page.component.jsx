/* eslint-disable no-shadow */
// TODO: FIX THIS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import type { RouterHistory, Match } from 'react-router-dom';
import { Button, H1 } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';

import './log-history-page.styles.scss';

import { selectAllLogsByTaskIdProps } from '../../redux/log/log.selectors';
import { selectTaskByParams } from '../../redux/task/task.selectors';

import { getAllLogs } from '../../redux/log/log.actions';

import type { Task } from '../../redux/task/task.flow-types';
import type { Log } from '../../redux/log/log.flow-types';

import LogHistoryItem from '../../components/log-history-item/log-history-item.component';
import PaginationComponent from '../../components/pagination/pagination.component';

const createTestAttr = createTestContext('log-history');

type Props = {
  logs: Array<Log>,
  task: Task,
  match: Match,
  history: RouterHistory,
  getAllLogs: (id: string) => Array<Log>
};

type State = {
  openDescription: boolean,
  activePage: number
};

class LogHistoryPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openDescription: false,
      activePage: 1,
    };
  }

  componentDidMount(): void {
    const { getAllLogs, task } = this.props;
    getAllLogs(task.id);
  }

  handlePaginationChange = (pageNumber: number) => {
    this.setState({ activePage: pageNumber });
  };

  render() {
    const { activePage, openDescription } = this.state;
    const { match, history } = this.props;
    const { logs } = this.props;
    return (
      <div className="log-history">
        <div className="header">
          <div className="header-left">
            <H1 style={{ marginRight: '20px' }}>
              Logs
            </H1>
            <div className="toggler-wrapper">
              <button
                type="button"
                className={`${!openDescription ? 'active' : ''} toggler`}
                onClick={() => this.setState({ openDescription: false })}
                data-test={createTestAttr('toggle-description-button')}
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
                data-test={createTestAttr('toggle-description-button')}
                type="button"
                className={`${openDescription ? 'active' : ''} toggler`}
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
          <Button
            data-test={createTestAttr('add-log-button')}
            onClick={() => history.push(`${match.url}/logcreate`)}
          >
            Add Log
          </Button>
        </div>
        {logs.length >= 1 && (
          <PaginationComponent
            activePage={activePage}
            totalItemsCount={logs.length}
            itemsCountPerPage={10}
            onChange={this.handlePaginationChange}
          />
        )}
        <div className="body">
          <div className="list-header">
            <span className="list-header-item">#</span>
            <span className="list-header-item">Assignee</span>
            <span className="list-header-item">Timestamp</span>
            <span className="list-header-item">Spent Time</span>
            <span className="list-header-item">Comment</span>
            <span className="list-header-item" />
          </div>
          <div className="list-body">
            {logs
              ? logs
              // $FlowFixMe
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((log, i) => (
                  <LogHistoryItem
                    number={i + 1}
                    key={log.id}
                    log={log}
                    openDescriptionToggler={openDescription}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  logs: selectAllLogsByTaskIdProps,
  task: selectTaskByParams,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { getAllLogs },
)(LogHistoryPage);
