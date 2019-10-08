import React from 'react';
// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import Spinner from 'ui-kit/Spinner';

export default {
  title: 'Spinner',
};

storiesOf('Spinner', module)
  .addWithChapters('Spinner', {
    chapters: [
      {
        sections: [
          {
            title: 'Spinner use=dark',
            sectionFn: () => (
              <Spinner use="dark" />
            ),
          },
          {
            title: 'Spinner use=light',
            sectionFn: () => (
              <div style={{ background: '#333' }}><Spinner use="light" /></div>
            ),
          },
        ],
      },
    ],
  });
