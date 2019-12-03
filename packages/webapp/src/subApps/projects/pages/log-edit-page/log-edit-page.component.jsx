/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unused-state */
// TODO: FIX THIS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import {
  H1,
} from '@sfxdx/ui-kit';
import Header from 'subApps/projects/components/header';
import LogForm, { type Fields } from '../../components/log-form';
import { editLog } from '../../redux/log/log.actions';

import { selectProjectItem } from '../../redux/project/project.selectors';
import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectServerError } from '../../redux/error/error.selectors';
import { selectAllLogs, selectLogByLogId } from '../../redux/log/log.selectors';
import { selectTaskByParams } from '../../redux/task/task.selectors';
// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';
import '../log-create-page/log-create-page.styles.scss';

import type { Project } from '../../redux/project/project.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Log, LogCreation } from '../../redux/log/log.flow-types';
import type { Task } from '../../redux/task/task.flow-types';

type State = {
  logId: string,
  date: Date,
  minutes: string,
  hours: string,
  comment: string,
  errors: Array<string>,
  estimatedTime: number,
  spentTime: number
};

type Props = {
  editLog: (editedLog: LogCreation, history: RouterHistory) => Log,
  project: Project,
  milestone: Milestone,
  task: Task,
  log: Log,
  history: RouterHistory
};

class LogEditPage extends React.Component<Props, State> {
  handleSubmit = (values: Fields) => {
    const { history, editLog, task } = this.props;
    const {
      date, comment, hours, minutes,
    } = values;
    const editedLog = {
      id: task.id,
      date,
      comment,
      spentTime: `${Number(hours) * 60 + Number(minutes)}`,
    };
    editLog(editedLog, history);
  };

  render() {
    const {
      milestone, project, task, log,
    } = this.props;
    return (
      <div className="log-create">
        <Header>
          <H1>Edit Log</H1>
        </Header>
        <LogForm
          milestone={milestone}
          project={project}
          testContext="edit-log"
          task={task}
          initialValues={{
            comment: log.comment,
            hours: parseInt(log.spentTime / 60, 10),
            minutes: log.spentTime % 60,
            date: new Date(log.date),
          }}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  project: selectProjectItem,
  milestone: selectMilestoneByParams,
  error: selectServerError,
  logs: selectAllLogs,
  log: selectLogByLogId,
  task: selectTaskByParams,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { editLog },
)(LogEditPage);
