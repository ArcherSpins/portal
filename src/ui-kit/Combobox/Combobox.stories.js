/* eslint-disable */
import React from 'react';
import { action } from '@storybook/addon-actions';
import Combobox from 'ui-kit/Combobox';
import { storiesOf } from '@storybook/react';


export default {
  title: 'Combobox',
};

const options = [
  {
    id: '1',
    label: 'Option 1',
    value: 'Option 1'
  },
  {
    id: '2',
    label: 'Option 2',
    value: 'Option 2'
  },
  {
    id: '3',
    label: 'Option 3',
    value: 'Option 3'
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

const onChange = action('Selected option');


storiesOf('Combobox', module)
  .addWithChapters('Combobox', {
    chapters: [
      {
        info: "Combobox",
        sections: [
          {
            title: 'Combobox без выбранного элемента',
            sectionFn: () => {
              return <Combobox
                        onChange={onChange}
                        loadOptions={loadOptions}
                        label="Title"
                      />
            },
          },
          {
            title: 'Combobox с выбранным элементом',
            sectionFn: () => {
              return <Combobox
                        onChange={onChange}
                        loadOptions={loadOptions}
                        label="Title"
                        selectedOption={options[0]}
                      />
            },
          },
          {
            title: 'Combobox с ошибкой',
            sectionFn: () => {
              return <Combobox onChange={onChange} loadOptions={loadOptions} label="Title" error="Error text" />
            },
          },
        ],
      },
    ],
  });

