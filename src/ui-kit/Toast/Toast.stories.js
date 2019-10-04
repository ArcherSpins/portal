/* eslint-disable */
import React from 'react';
// import { action } from '@storybook/addon-actions';
import { Toast } from 'ui-kit';

export default {
  title: 'Toast',
};

export const defaultStory = () => {
  return (
    <button onClick={() => Toast.push('Show notification')}>Show toast</button>
  )
};
