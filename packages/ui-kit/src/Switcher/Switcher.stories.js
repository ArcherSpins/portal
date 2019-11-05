import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Switcher from '.';

export default {
  title: 'Switcher',
};

const items = ['one', 'two', 'three'];
const anotherItems = [
  {
    label: 'one',
    value: '#1',
  },
  {
    label: 'two',
    value: '#2',
  },
  {
    label: 'three',
    value: '#3',
  },
];

const Wrap = () => {
  const [value, setValue] = useState('');
  return (
    <Switcher value={value} items={anotherItems} onChange={setValue} />
  );
};


storiesOf('Switcher', module)
  .addWithChapters('Switcher', {
    chapters: [
      {
        sections: [
          {
            title: 'Default Switcher',
            sectionFn: () => (
              <Switcher value="one" items={items} onChange={action('clicked')} />
            ),
          },
          {
            title: 'Small Switcher',
            sectionFn: () => (
              <Switcher size="sm" value="one" items={items} onChange={action('clicked')} />
            ),
          },
          {
            title: 'Toggle switcher',
            sectionFn: () => (
              <Wrap />
            ),
          },
        ],
      },
    ],
  });
