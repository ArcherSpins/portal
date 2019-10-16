/* eslint-disable */
import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react'
import Datepicker from 'ui-kit/Datepicker';


storiesOf('Datepicker', module)
  .addWithChapters('default', {
    chapters: [
      {
        sections: [
          {
            sectionFn: () => (
              <div style={{ width: '300px'}}>
                <Datepicker onDayChange={action('day changed!')} />
              </div>
            ),
          },
          {
            sectionFn: () => (
              <div style={{ width: '300px'}}>
                <Datepicker value={new Date()} onDayChange={action('day changed!')} />
              </div>
            )
          }
        ],
      },
    ],
  });