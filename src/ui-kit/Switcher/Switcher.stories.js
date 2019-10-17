import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Switcher from '.';

export default {
  title: 'Switcher',
};

const items = ['one', 'two', 'three'];

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
        ],
      },
    ],
  });
