/* eslint-disable */
import React from 'react';
import { action } from '@storybook/addon-actions';
import TablePaginate from 'ui-kit/TablePaginate';
import { storiesOf } from '@storybook/react';


const data = [
  {
    id: '1',
    assignee: 'Konstantin Konstantinopolsky 1',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
  {
    id: '2',
    assignee: 'Konstantin Konstantinopolsky 1',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
  {
    id: '3',
    assignee: 'Konstantin Konstantinopolsky 1',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
  {
    id: '4',
    assignee: 'Konstantin Konstantinopolsky 2',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
  {
    id: '5',
    assignee: 'Konstantin Konstantinopolsky 2',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
  {
    id: '6',
    assignee: 'Konstantin Konstantinopolsky 2',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
  {
    id: '7',
    assignee: 'Konstantin Konstantinopolsky 3',
    timespent: {
      time: '22:38',
      date: '19/08/30',
    },
    spentTime: '8:00',
    comment: 'Ius dicat feugiat no, vix cu modo dicat Ius dicat Ius dicat feugiat no, vix cu modo dicat',
  },
];

const getNumberPaginate = action('Change paginate')

storiesOf('TablePaginate', module)
  .addWithChapters('TablePaginate', {
    chapters: [
      {
        info: "TablePaginate component",
        sections: [
          {
            title: 'TablePaginate',
            sectionFn: () => {
              return <TablePaginate items={data} pageSize={3} getNumberPaginate={getNumberPaginate} />;
            },
          },
        ],
      },
    ],
  });
