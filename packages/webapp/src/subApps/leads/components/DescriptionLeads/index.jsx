// @flow
import React from 'react';
import BlockTitle from '../BlockTItle';

export default () => (
  <div className="h-100">
    <div className="d-flex justify-content-between">
      <BlockTitle title="Job title">
        <p className="color-black">Mobile App Development</p>
      </BlockTitle>
      <BlockTitle title="Posted">
        <p className="color-black">31.11.19 13:05</p>
      </BlockTitle>
    </div>
  </div>
);
