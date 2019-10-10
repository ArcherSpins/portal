/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable react/no-unused-state */
// TODO: FIX THIS
// @flow
import React from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import type { RouterHistory } from 'react-router-dom';
import noop from 'lodash.noop';
import { createStructuredSelector } from 'reselect';

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

import CustomTextarea from '../../components/forms/custom-textarea/custom-textarea.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import TextInput from '../../components/forms/text-input/text-input.component';

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
    const { milestone, project } = this.props;
    const { title, number } = milestone;
    const {
      date, comment, errors, minutes, hours,
    } = this.state;
    return (
      <div className="log-create">
        <div className="header-wrapper">
          <h1 className="heading-primary">New Log</h1>
        </div>
        <form onSubmit={this.handleSubmit} className="body">
          <div className="sub-header">
            <h2 className="sub-header-title">Task Name</h2>
            <div className="project-wrapper">
              <span className="project-label">Project:</span>
              <span className="project-title">{project.title}</span>
            </div>
            <span className="log-create-milestone">
              Milestone #
              {number}
:
              {' '}
              {title}
            </span>
          </div>
          <div className="time-wrapper">
            <div className="hours-wrapper">
              <TextInput
                header="Hours"
                onChange={this.handleHoursChange}
                value={hours}
              />
            </div>
            <div className="minutes-wrapper">
              <TextInput
                header="Minutes"
                onChange={this.handleMinutesChange}
                value={minutes}
              />
            </div>
            <span className="time-note">{this.showAbleToLog()}</span>
          </div>
          <div className="date-wrapper">
            <h3 className="heading-tertiarry">Date</h3>
            <div className="date-input-wrapper">
              <DatePicker
                className="date-input"
                selected={date}
                onChange={this.handleDateChange}
                minDate={new Date()}
                maxDate={
                  new Date(new Date().setFullYear(new Date().getFullYear() + 2))
                }
                customInput={<ExampleCustomInput />}
              />
            </div>
          </div>
          <CustomTextarea
            header="Comment"
            placeholder="Please describe the work you have done"
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
          <CustomButton type="submit" color="dark-gray">
            Save
          </CustomButton>
        </form>
      </div>
    );
  }
}

// TODO: FIX
type Props2 = {
  value?: string,
  onClick?: (e: SyntheticMouseEvent<*>) => void,
  onChange?: (e: SyntheticInputEvent<HTMLInputElement>) => void
};

const ExampleCustomInput = ({ value, onChange, onClick }: Props2) => {
  ExampleCustomInput.defaultProps = {
    value: '',
    onClick: noop,
    onChange: noop,
  };
  return (
    <div className="date-input-wrapper">
      <input
        type="text"
        className="date-input"
        value={value}
        onChange={onChange}
      />
      <label className="date-label" htmlFor="date" onClick={onClick}>
        <svg
          width="17"
          height="18"
          viewBox="0 0 17 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.73877 0H4.73877V2H12.7388V0H14.7388V2C15.8433 2 16.7388 2.89543 16.7388 4V16C16.7388 17.1046 15.8433 18 14.7388 18H2.73877C1.6342 18 0.73877 17.1046 0.73877 16V4C0.73877 2.89543 1.6342 2 2.73877 2V0ZM14.7388 6H2.73877V16H14.7388V6Z"
            fill="black"
            fillOpacity="0.54"
          />
        </svg>
      </label>
    </div>
  );
};

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
