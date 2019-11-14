/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Accent from './';
import { storiesOf } from '@storybook/react';

storiesOf('Accent', module)
  .addWithChapters('Accent', {
    chapters: [
      {
        info: "Accent component",
        sections: [
          {
            title: 'Default',
            sectionFn: () => {
              return <Accent><p>here some text</p></Accent>
            },
          },
          {
            title: 'Success',
            sectionFn: () => {
              return <Accent color="success"><p>here some text</p></Accent>
            },
          },
          {
            title: 'Danger',
            sectionFn: () => {
              return <Accent color="danger"><p>here some text</p></Accent>
            },
          },
        ],
      },
    ],
  });

