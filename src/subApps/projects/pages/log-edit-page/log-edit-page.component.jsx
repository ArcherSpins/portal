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
  Input, Button, TextArea, Datepicker,
} from 'ui-kit';
import Header from 'subApps/projects/components/header';
import { addYears } from 'date-fns';
import { editLog } from '../../redux/log/log.actions';

import { selectProjectItem } from '../../redux/project/project.selectors';
import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectServerError } from '../../redux/error/error.selectors';
import { selectAllLogs, selectLogByLogId } from '../../redux/log/log.selectors';

import { getEstimation } from '../../graphql/queries/milestone.queries';

import { logEditHours, logEditMinutes } from '../../helpers/sumTime';

// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';
import '../log-create-page/log-create-page.styles.scss';

import type { Project } from '../../redux/project/project.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Error } from '../../redux/error/error.flow-types';
import type { Log, LogCreation } from '../../redux/log/log.flow-types';

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
  error: Error,
  log: Log,
  history: RouterHistory
};

class LogEditPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      logId: props.log.id,
      date: new Date(props.log.date),
      minutes: logEditMinutes(props.log.spentTime),
      hours: logEditHours(props.log.spentTime),
      comment: props.log.comment,
      errors: [],
      estimatedTime: 0,
      spentTime: 0,
    };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps = (nextProps: Props) => {
    if (nextProps.error.message) {
      let { errors } = this.state;
      errors = [nextProps.error.message, ...errors];
      this.setState({ errors });
    }
  };

  componentDidMount = () => {
    const { milestone } = this.props;
    getEstimation(milestone.id).then((response) => {
      const { estimatedTime, spentTime } = response.data.milestone;
      this.setState({ estimatedTime, spentTime });
    });
  };

  handleDateChange = (date: Date) => {
    this.setState({ date });
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ comment: e.target.value });
  };

  filterMinutes = (term: string) => {
    // TODO: REFACTOR
    const regex = new RegExp('^[0-9]*$');
    if (regex.test(term)) {
      if (parseFloat(term) === 1) {
        return '01';
      }
      if (parseFloat(term) === 2) {
        return '02';
      }
      if (parseFloat(term) === 3) {
        return '03';
      }
      if (parseFloat(term) === 4) {
        return '04';
      }
      if (parseFloat(term) === 5) {
        return '05';
      }
      if (parseFloat(term) === 6) {
        return '06';
      }
      if (parseFloat(term) === 7) {
        return '07';
      }
      if (parseFloat(term) === 8) {
        return '08';
      }
      if (parseFloat(term) === 9) {
        return '09';
      }
      if (parseFloat(term) >= 10 && term.charAt(0) == '0') {
        return term.substring(1);
      }
      if (parseFloat(term) <= 59) {
        return term;
      }
      return term.substring(0, term.length - 1);
    }
    return term.substring(0, term.length - 1);
  };

  handleMinutesChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ minutes: this.filterMinutes(e.target.value) });
  };

  handleHoursChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ hours: this.filterHours(e.target.value) });
  };

  filterHours = (term: string) => {
    // TODO: REFACTOR
    const regex = new RegExp('^[0-9]*$');
    if (regex.test(term)) {
      if (parseFloat(term) === 1) {
        return '01';
      }
      if (parseFloat(term) === 2) {
        return '02';
      }
      if (parseFloat(term) === 3) {
        return '03';
      }
      if (parseFloat(term) === 4) {
        return '04';
      }
      if (parseFloat(term) === 5) {
        return '05';
      }
      if (parseFloat(term) === 6) {
        return '06';
      }
      if (parseFloat(term) === 7) {
        return '07';
      }
      if (parseFloat(term) === 8) {
        return '08';
      }
      if (parseFloat(term) === 9) {
        return '09';
      }
      if (parseFloat(term) >= 10 && term.charAt(0) == '0') {
        return term.substring(1);
      }
      if (parseFloat(term) <= 24) {
        return term;
      }
      return term.substring(0, term.length - 1);
    }
    return term.substring(0, term.length - 1);
  };

  validate = () => {
    const {
      comment, minutes, hours, date,
    } = this.state;

    const errors = [];
    if (!comment) {
      errors.push('Comment Field');
    }

    if (!date) {
      errors.push('Date Field');
    }

    if (
      // TODO: REFACTOR
      (!minutes && !hours)
      || (minutes == '00' && hours == '0')
      || (minutes == '0' && hours == '0')
    ) {
      errors.push('Time Field');
    }

    if (!minutes && hours) {
      this.setState({ minutes: '00' });
    }

    if (minutes && !hours) {
      this.setState({ hours: '0' });
    }

    return errors;
  };

  // eslint-disable-next-line consistent-return
  showAbleToLog = () => {
    let hours = 0;
    let minutes = 0;
    const { estimatedTime, spentTime } = this.state;
    const dif = estimatedTime - spentTime;
    hours = dif / 60;
    minutes = dif % 60;
    if (minutes > 0 || hours > 0) {
      return `Able to log ${Math.floor(hours)}:${minutes}`;
    }
  };

  handleSubmit = (e: SyntheticInputEvent<*>) => {
    e.preventDefault();
    const { log, editLog, history } = this.props;
    const isValid = this.validate();
    const { id } = log;
    const {
      date, comment, minutes, hours,
    } = this.state;
    if (isValid.length) {
      this.setState({ errors: isValid });
    } else {
      const newMinutes = parseFloat(minutes) || 0;
      const newHours = hours ? parseFloat(hours) * 60 : 0;
      const sum = newMinutes + newHours;
      const editedLog = {
        id,
        date,
        comment,
        spentTime: sum.toString(),
      };
      editLog(editedLog, history);
    }
  };

  render() {
    const { milestone, project, log } = this.props;
    const { title, number } = milestone;
    const {
      date, comment, errors, minutes, hours,
    } = this.state;
    const now = new Date();
    return (
      <div className="log-create">
        <Header>
          <h1 className="heading-primary">Edit Log</h1>
        </Header>
        <form onSubmit={this.handleSubmit} className="body">
          <div className="pb1 mb1 border">
            <h2 className="sub-header-title mb05">{log.task.title}</h2>
            <div className="project-wrapper mb05">
              <span className="project-label">
              Project:
                {' '}
              </span>
              <span className="project-title">{project.title}</span>
            </div>
            <span className="log-create-milestone mb05">
              Milestone #
              {number}
:
              {' '}
              {title}
            </span>
          </div>
          <div className="time-wrapper mb1">
            <div className="hours-wrapper">
              <Input
                label="Hours"
                onChange={this.handleHoursChange}
                value={hours}
              />
            </div>
            <div className="minutes-wrapper mr1">
              <Input
                label="Minutes"
                onChange={this.handleMinutesChange}
                value={minutes}
              />
            </div>
            <span className="time-note">{this.showAbleToLog()}</span>
          </div>
          <div>
            <Datepicker
              className="project__datepicker mb1"
              label="Date"
              onChange={this.handleDateChange}
              value={date}
              disabledDays={{
                before: now,
                after: addYears(now, 2),
              }}
            />
          </div>
          <TextArea
            label="Comment"
            placeholder="Please describe the work you have done"
            value={comment}
            className="mb1"
            onChange={this.handleChange}
          />
          {errors.length >= 1 && (
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
          <Button type="submit">
            Save
          </Button>
        </form>
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
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { editLog },
)(LogEditPage);
