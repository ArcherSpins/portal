import React from 'react';
import { action } from '@storybook/addon-actions';
import Chip from 'ui-kit/Chip';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

const onClick = action('deleted chip');

storiesOf('Chip', module)
  .addDecorator(withKnobs)
  .addWithChapters('Chips', {
    chapters: [
      {
        info: 'Компонент Chip',
        sections: [
          {
            title: 'Chip',
            sectionFn: () => (
              <Chip title="Title Chip" id="12" onClick={onClick} />
            ),
          },
        ],
      },
    ],
  });
