/* eslint-disable */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { H1, H2, H3, H4 } from '.';

storiesOf('Typography', module)
  .addWithChapters('Headings', {
    chapters: [
      {
        sections: [
          {
            title: "H1 Heading:",
            sectionFn: () => <H1>Lorem Ipsum</H1>,
          },
          {
            title: "H2 Heading:",
            sectionFn: () => <H2>Lorem Ipsum</H2>,
          },
        ]
      }
    ]
  })