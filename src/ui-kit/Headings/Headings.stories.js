/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { H1, H2, H3, H4 } from 'ui-kit/Headings';

storiesOf('Headings', module)
  .addWithChapters('Text input', {
    chapters: [
      {
        sections: [
          {
            title: "H1 Heading:",
            sectionFn: () => <H1>Lorem Ipsum</H1>,
          },
        ]
      }
    ]
  })