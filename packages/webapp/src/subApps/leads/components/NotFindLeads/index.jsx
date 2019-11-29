import React from 'react';
import { Button } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import './style.scss';

const createTestAttr = createTestContext('leads-not-find');

export default () => (
  <div className="text-center">
    <h3 className="title-not-find">You don`t have Job Posting in “Open” status yet</h3>
    <p className="subtitle-not-find">Please click to find Job Posting for processing</p>
    <Button data-test={createTestAttr('get-new-job-button')}>Get new job</Button>
  </div>
);
