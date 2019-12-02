// @flow

import React from 'react';
import {
  useFormik,
} from 'formik';
import {
  Input, Datepicker, TextArea, Button, ErrorText,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import { addYears } from 'date-fns';

import type { Project } from '../../redux/project/project.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Task } from '../../redux/task/task.flow-types';
// import type { Log, LogCreation } from '../../redux/log/log.flow-types';

const showAbleToLog = (estimated: number, spent: number): string => {
  const diff = estimated - spent;
  const hours = parseInt(diff / 60, 10);
  const minutes = diff % 60;
  return `Able to log: ${hours}:${minutes}`;
};

export type Fields = {
  hours: string,
  minutes: string,
  date: Date,
  comment: string
}

type Props = {
  onSubmit: (values: Fields) => void,
  task: Task,
  project: Project,
  milestone: Milestone,
  testContext: 'create-log' | 'edit-log',
  hours?: string,
  minutes?: string,
  date?: string,
  comment?: string
}

const LogForm = ({
  onSubmit,
  task,
  project,
  milestone,
  testContext,
  hours,
  minutes,
  date,
  comment,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      hours,
      minutes,
      date,
      comment,
    },

    onSubmit: (values) => onSubmit(values),

    validate: (values) => {
      const errors = {};

      if (!values.hours) {
        errors.hours = 'Please, set hours field';
      }

      if (!values.minutes) {
        errors.minutes = 'Please, set minutes field';
      }

      if (!values.date) {
        errors.date = 'Please, set date field';
      }

      if (!values.comment) {
        errors.comment = 'Please, write a comment';
      }

      return errors;
    },

  });

  const createTestAttr = createTestContext(testContext);
  const now = new Date();

  const { estimatedTime, spentTime } = milestone;

  return (
    <form onSubmit={formik.handleSubmit} className="body">
      <div className="pb1 mb1 border">
        <h2 className="sub-header-title mb05">{task.title}</h2>
        <div className="project-wrapper mb05">
          <span className="project-label">Project:</span>
          <span className="project-title">{project.title}</span>
        </div>
        <span className="log-create-milestone mb05">
          Milestone #
          {milestone.number}
          :
          {' '}
          {milestone.title}
        </span>
      </div>
      <div className="time-wrapper mb1">
        <div className="hours-wrapper">
          <Input
            label="Hours"
            onChange={formik.handleChange}
            name="hours"
            type="number"
            error={formik.errors.hours}
            min="0"
            max="23"
            value={formik.values.hours}
            data-test={createTestAttr('hours-input')}
          />
        </div>
        <div className="minutes-wrapper mr1">
          <Input
            label="Minutes"
            onChange={formik.handleChange}
            name="minutes"
            type="number"
            error={formik.errors.minutes}
            min="0"
            max="59"
            value={formik.values.minutes}
            data-test={createTestAttr('minutes-input')}
          />
        </div>
        <span className="time-note">{showAbleToLog(estimatedTime, spentTime)}</span>
      </div>
      <div>
        <Datepicker
          className="project__datepicker mb1"
          label="Date"
          name="date"
          error={formik.errors.date}
          onDayChange={(value) => formik.setFieldValue('date', value)}
          value={formik.values.date}
          containerProps={{
            'data-test': createTestAttr('datepicker'),
          }}
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
        error={formik.errors.comment}
        value={formik.values.comment}
        data-test={createTestAttr('comment-input')}
        onChange={formik.handleChange}
      />
      {Object.keys(formik.errors).map((field) => (
        <ErrorText key={field}>{formik.errors[field]}</ErrorText>
      ))}
      <Button
        type="submit"
        data-test={createTestAttr('log-button')}
        disabled={!formik.isValid}
        style={{ marginTop: '1rem' }}
      >
        Log It
      </Button>
    </form>
  );
};

LogForm.defaultProps = {
  hours: '',
  minutes: '',
  date: '',
  comment: '',
};

export default LogForm;
