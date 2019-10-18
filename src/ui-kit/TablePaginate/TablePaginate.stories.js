/* eslint-disable */
import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import TablePaginate from 'ui-kit/TablePaginate';
import { storiesOf } from '@storybook/react';
import { columns, defaultData } from './default';

const getPageItems = (array, chunkSize: 1) => {
  const result = [];
  const maxLength = array.length;

  for (let item = 0; item < maxLength; item += chunkSize) {
    result.push(array.slice(item, item + chunkSize));
  }

  return result;
};

const RenderTableManual = ({ pageSize }) => {
  const [data, onPaginate] = useState(getPageItems(defaultData, pageSize));
  const [active, togglePage] = useState(0);

  const getNumber = (idx) => {
    togglePage(idx - 1);
  }

  return (
    <TablePaginate
      items={data[active]}
      pageSize={3}
      getNumber={getNumber}
      columns={columns}
      activeIndex={active}
      count={Math.ceil(defaultData.length / Number(pageSize))}
      manual
    />
  );
}

const getNumber = action('Change paginate')

storiesOf('TablePaginate', module)
  .addWithChapters('TablePaginate', {
    chapters: [
      {
        info: "TablePaginate component",
        sections: [
          {
            title: 'TablePaginate',
            sectionFn: () => {
              return <TablePaginate
                        items={defaultData}
                        pageSize={3}
                        getNumber={getNumber}
                        columns={columns}
                      />;
            },
          },
          {
            title: 'TablePaginate рендер с пропсов с флагом malual',
            sectionFn: () => {
              return <RenderTableManual pageSize={3} />;
            },
          },
        ],
      },
    ],
  });
