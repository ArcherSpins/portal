import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Chip from '.';

const onDelete = action('chip onDelete clicked!');

storiesOf('Chip', module)
  .addWithChapters('Chips', {
    chapters: [
      {
        info: 'Chip with onDelete',
        sections: [
          {
            title: 'Chip',
            sectionFn: () => (
              <Chip title="Tatyana Andreeva" id="12" onDelete={onDelete} />
            ),
          },
        ],
      },
      {
        info: 'Without onDelete handler',
        sections: [
          {
            title: 'Chip',
            sectionFn: () => (
              <Chip title="Tatyana Andreeva" id="12" />
            ),
          },
        ],
      },
    ],
  });
