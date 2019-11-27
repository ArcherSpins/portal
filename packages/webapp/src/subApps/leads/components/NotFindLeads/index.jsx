import React from 'react';
import { Button } from '@sfxdx/ui-kit';
import './style.scss';

export default () => (
  <div className="text-center">
    <h3 className="title-not-find">You don`t have Job Posting in “Open” status yet</h3>
    <p className="subtitle-not-find">Please click to find Job Posting for processing</p>
    <Button>Get new job</Button>
  </div>
);
