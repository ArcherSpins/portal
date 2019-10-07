import React from 'react';
// import { action } from '@storybook/addon-actions';
import Spinner from 'ui-kit/Spinner';

export default {
  title: 'Spinner',
};

export const defaultStory = () => <div><Spinner use="dark" className="spinner" /></div>;
