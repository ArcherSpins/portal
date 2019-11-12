// @flow
import React from 'react';
import { Participants } from '@sfxdx/ui-kit';

type Props = {
  files: Array<{id: string, label: string}>
}

export default ({ files }: Props) => (
  <div className="d-flex border-bottom block-files">
    <Participants className="files" chips={files} name="files" onDelete={() => {}}>
      <p className="color-gray">Attached files:</p>
    </Participants>
  </div>
);
