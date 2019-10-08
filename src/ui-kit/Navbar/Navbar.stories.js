/* eslint-disable */
import React from 'react';
// import { action } from '@storybook/addon-actions';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from 'ui-kit/Navbar';

export default {
  title: 'Navbar',
};

export const navbar = () => <Router><Navbar /></Router>;
