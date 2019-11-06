/* eslint-disable */
import React from 'react';
// import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react'
import Container from '.';


storiesOf('Containers', module)
  .addWithChapters('Full Width Container', {
    chapters: [
      {
        sections: [
          {
            sectionFn: () => (
              <Container>This is full width container</Container>
            ),
          }
        ],
      },
    ],
  });