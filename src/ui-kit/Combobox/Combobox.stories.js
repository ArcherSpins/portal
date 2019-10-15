/* eslint-disable */
import React from 'react';
// import { action } from '@storybook/addon-actions';
import Combobox from 'ui-kit/Combobox';

export default {
  title: 'Combobox',
};

const options = [
  {
    id: '1',
    label: 'Option 1',
  },
  {
    id: '2',
    label: 'Option 2',
  },
  {
    id: '3',
    label: 'Option 3',
  }
];

const filterOptions = (inputValue: string) => {
  return options.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue, callback) => new Promise((res) => {
  setTimeout(() => {
    callback(filterOptions(inputValue));
  }, 1500);
});

const onChange = (...args) => console.log(args)


export const defaultStory = () => (
  <div>
    <Combobox onChange={onChange} loadOptions={loadOptions} />
  </div>
);
