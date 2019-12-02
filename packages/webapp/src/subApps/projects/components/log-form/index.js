// @flow

import React from 'react';
import {
  useFormik,
} from 'formik';
import {
  Input, Datepicker, TextArea, Button,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import { addYears } from 'date-fns';

import type { Project } from '../../redux/project/project.flow-types';
import type { Milestone } from '../../redux/milestone/milestone.flow-types';
import type { Task } from '../../redux/task/task.flow-types';
// import type { Log, LogCreation } from '../../redux/log/log.flow-types';

type Props = {
  onSubmit: {} => void,
  task: Task,
  project: Project,
  milestone: Milestone,
  testContext: 'create-log' | 'edit-log'
}

const LogForm = ({
  onSubmit,
  task,
  project,
  milestone,
  testContext,
}: Props) => {
  const formik = useFormik({
    initialValues: {
      hours: '',
      minutes: '',
      date: '',
      comment: '',
    },

    onSubmit: (values) => onSubmit(values),
  });

  const createTestAttr = createTestContext(testContext);
  const now = new Date();
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
            value={formik.values.hours}
            data-test={createTestAttr('hours-input')}
          />
        </div>
        <div className="minutes-wrapper mr1">
          <Input
            label="Minutes"
            onChange={formik.handleChange}
            name="minutes"
            value={formik.values.minutes}
            data-test={createTestAttr('minutes-input')}
          />
        </div>
        {/* <span className="time-note">{this.showAbleToLog()}</span> */}
      </div>
      <div>
        <Datepicker
          className="project__datepicker mb1"
          label="Date"
          name="date"
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
        value={formik.values.comment}
        data-test={createTestAttr('comment-input')}
        onChange={formik.handleChange}
      />
      <Button
        type="submit"
        data-test={createTestAttr('log-button')}
      >
        Log It
      </Button>
    </form>
  );
};

export default LogForm;
