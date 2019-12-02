// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from 'subApps/projects/components/header';
import {
  H1,
} from '@sfxdx/ui-kit';

import type { RouterHistory } from 'react-router-dom';
import LogForm, { type Fields } from '../../components/log-form';

import { createLog as createLogRequest } from '../../redux/log/log.actions';

import { selectProjectItem } from '../../redux/project/project.selectors';
import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectServerError } from '../../redux/error/error.selectors';
import { selectAllLogs } from '../../redux/log/log.selectors';
import { selectTaskByParams } from '../../redux/task/task.selectors';

import type { Project } from '../../redux/project/project.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Task } from '../../redux/task/task.flow-types';
import type { Log, LogCreation } from '../../redux/log/log.flow-types';

// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';
import './log-create-page.styles.scss';

type Props = {
  project: Project,
  milestone: Milestone,
  task: Task,
  createLog: (log: LogCreation, history: RouterHistory) => Log,
  history: RouterHistory
};

class LogCreate extends React.Component<Props> {
  handleSubmit = (values: Fields) => {
    const { task, createLog, history } = this.props;
    const {
      date, hours, minutes, comment,
    } = values;
    const newLog = {
      taskID: task.id,
      date,
      spentTime: `${Number(hours) * 60 + Number(minutes)}`,
      comment,
    };
    createLog(newLog, history);
  };

  render() {
    const { milestone, task, project } = this.props;
    return (
      <div className="log-create">
        <Header>
          <H1>New Log</H1>
        </Header>
        <LogForm
          milestone={milestone}
          task={task}
          project={project}
          onSubmit={this.handleSubmit}
          testContext="create-log"
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  project: selectProjectItem,
  milestone: selectMilestoneByParams,
  error: selectServerError,
  task: selectTaskByParams,
  logs: selectAllLogs,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { createLog: createLogRequest },
)(LogCreate);
