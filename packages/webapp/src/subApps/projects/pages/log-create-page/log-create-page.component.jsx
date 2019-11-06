/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
// TODO: FIX THIS
// @flow
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Header from 'subApps/projects/components/header';
import {
  Input, Button, TextArea, Datepicker, H1,
} from '@sfxdx/ui-kit';
import { addYears } from 'date-fns';

import type { RouterHistory } from 'react-router-dom';

import { createLog } from '../../redux/log/log.actions';

import { selectProjectItem } from '../../redux/project/project.selectors';
import { selectMilestoneByParams } from '../../redux/milestone/milestone.selectors';
import { selectServerError } from '../../redux/error/error.selectors';
import { selectAllLogs } from '../../redux/log/log.selectors';
import { selectTaskByParams } from '../../redux/task/task.selectors';

import { getEstimation } from '../../graphql/queries/milestone.queries';

import type { Project } from '../../redux/project/project.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Error } from '../../redux/error/error.flow-types';
import type { Task } from '../../redux/task/task.flow-types';
import type { Log, LogCreation } from '../../redux/log/log.flow-types';

// $FlowFixMe
import 'react-datepicker/dist/react-datepicker.css';
import './log-create-page.styles.scss';


type State = {
  date: Date,
  minutes: string,
  hours: string,
  comment: string,
  errors: Array<string>,
  estimatedTime: number,
  spentTime: number
};

type Props = {
  project: Project,
  milestone: Milestone,
  error: Error,
  task: Task,
  createLog: (log: LogCreation, history: RouterHistory) => Log,
  history: RouterHistory
};

class LogCreate extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      minutes: '00',
      hours: '00',
      comment: '',
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

  filterHours = (term: string) => {
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

  handleDateChange = (date: Date) => {
    this.setState({ date });
  };

  handleChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ comment: e.target.value });
  };

  handleMinutesChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ minutes: this.filterMinutes(e.target.value) });
  };

  handleHoursChange = (e: SyntheticInputEvent<*>) => {
    this.setState({ hours: this.filterHours(e.target.value) });
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
    const isValid = this.validate();
    const { task, createLog, history } = this.props;
    const {
      date, comment, minutes, hours,
    } = this.state;
    if (isValid.length) {
      this.setState({ errors: isValid });
    } else {
      const newMinutes = parseFloat(minutes) || 0;
      const newHours = hours ? parseFloat(hours) * 60 : 0;
      const sum = newMinutes + newHours;
      const newLog = {
        taskID: task.id,
        date,
        spentTime: sum.toString(),
        comment,
      };
      createLog(newLog, history);
    }
  };

  render() {
    const { title, number } = this.props.milestone;
    const {
      date, comment, errors, minutes, hours,
    } = this.state;
    const now = new Date();

    return (
      <div className="log-create">
        <Header>
          <H1>New Log</H1>
        </Header>
        <form onSubmit={this.handleSubmit} className="body">
          <div className="pb1 mb1 border">
            <h2 className="sub-header-title mb05">{this.props.task.title}</h2>
            <div className="project-wrapper mb05">
              <span className="project-label">Project:</span>
              <span className="project-title">{this.props.project.title}</span>
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
              onDayChange={this.handleDateChange}
              value={date}
              disabledDays={{
                before: now,
                after: addYears(now, 2),
              }}
            />
          </div>
          <TextArea
            label="Comment"
            name="comment"
            placeholder="Please describe the work you have done"
            className="mb1"
            value={comment}
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
            Log It
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
  task: selectTaskByParams,
  logs: selectAllLogs,
});

// $FlowFixMe
export default connect(
  mapStateToProps,
  { createLog },
)(LogCreate);
