// @flow

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import Checkbox from 'ui-kit/Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  // TODO: $FlowFixMe
  .addWithChapters('Default', {
    chapters: [
      {
        sections: [
          {
            title: 'Idle',
            sectionFn: () => {
              const id = 'checkbox_1';

              return (
                <Checkbox
                  id={id}
                  checked={boolean('Checked', false)}
                  onChange={action(`On checkbox #${id} click`)}
                />
              );
            },
          },
          {
            title: 'With label',
            sectionFn: () => {
              const id = 'checkbox_2';

              return (
                <Checkbox
                  id="checkbox 2"
                  checked={boolean('Checked', false)}
                  label="Inactive tasks"
                  onChange={action(`On checkbox #${id} click`)}
                />
              );
            },
          },
        ],
      },
    ],
  });
