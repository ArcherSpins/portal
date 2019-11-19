// @flow
import React from 'react';
import {
  H1,
  TextArea,
  Button,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import { TextEdit } from './styled';

const createTestAttr = createTestContext('modal');

type Props = {
  value: string,
  onResolved: () => void,
  onChange: (string) => void
}

export default ({
  value, onResolved, onChange,
}: Props) => (
  <div className="edit-comment">
    <H1 className="fz-24">Resolve Task</H1>
    <TextEdit onChange={(e) => onChange(e.target.value)} className="mb-5">
      Do you want to confirm the task?
      <br />
      Please tell us about successes. Thanks!
    </TextEdit>
    <div className="color-gray">
      <TextArea
        className="fz-14 comment-parent"
        label="Comment"
        placeholder="Edit comment"
        value={value}
        data-test={createTestAttr('comment-text')}
      />
    </div>
    <div className="d-flex justify-content-end mt-3">
      <Button onClick={onResolved} data-test={createTestAttr('task-resolved')}>Task Resolved</Button>
    </div>
  </div>
);
