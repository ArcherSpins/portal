import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Chip from '.';

const onDelete = action('chip onDelete clicked!');

storiesOf('Chip', module)
  .addWithChapters('Chips', {
    chapters: [
      {
        info: 'Компонент Chip',
        sections: [
          {
            title: 'Chip',
            sectionFn: () => (
              <Chip title="Tatyana Andreeva" id="12" onDelete={onDelete} />
            ),
          },
        ],
      },
    ],
  });
