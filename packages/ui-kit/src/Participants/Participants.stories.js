/* eslint-disable */
import React from 'react';
import { action } from '@storybook/addon-actions';
import Participants from '.';
import { storiesOf } from '@storybook/react';

const data = [
  { id: '1', title: 'sdsd' },
  { id: 'sd', title: 'sdswqdwqdqwdwqdqwdwqdwqdqwdwqdqwdqwdqwdd' },
  { id: '24124', title: 'sdsd' },
  { id: '3', title: 'ssd' },
  { id: '12313', title: 'sdsd' },
]

const onDelete = action('Deleted chip!');
const onCreate = action('Created chip!');

export default {
  title: 'Participants',
};



storiesOf('Participants', module)
  .addWithChapters('Participants', {
    chapters: [
      {
        info: "Participants",
        sections: [
          {
            title: 'Participants',
            sectionFn: () => {
              return <Participants chips={data} onDelete={onDelete} onCreate={onCreate} />;
            },
          },
        ],
      },
    ],
  });