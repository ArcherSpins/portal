/* eslint-disable */
import React from 'react';
import { action } from '@storybook/addon-actions';
import Datepicker from 'ui-kit/Datepicker';

export default {
  title: 'Datepicker',
};

export const defaultStory = () => (
  <div style={{ width: '50%' }}>
    <Datepicker onDayChange={action('date changed!')} />
  </div>
);
