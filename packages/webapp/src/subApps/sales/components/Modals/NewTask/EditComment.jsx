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
  value: string
}

export default ({
  value,
}: Props) => (
  <div className="edit-comment">
    <H1 className="fz-24">Resolve Task</H1>
    <TextEdit className="mb-5">
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
        onChange={() => {}}
      />
    </div>
    <div className="d-flex justify-content-end mt-3">
      <Button data-test={createTestAttr('task-resolved')}>Task Resolved</Button>
    </div>
  </div>
);
