import React from 'react';
import { action } from '@storybook/addon-actions';
import Chip from 'ui-kit/Chip';
import { storiesOf } from '@storybook/react';

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
