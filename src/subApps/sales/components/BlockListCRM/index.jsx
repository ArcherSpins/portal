/* eslint-disable react/no-unused-state */
// @flow

import * as React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { DealType } from '../../types/deal';
import './style.scss';

type ComponentTypeProps = {
  allStatus: boolean,
  // key: string | number,
  index: string | number
}

export type BlockListCRMProps = {
  children: React.Node | any,
  tasks: Array<DealType>,
  Component: React.ComponentType<ComponentTypeProps>,
  className: string,
  index: number | string,
  allStatus: boolean,
  id: number | string,
  setSefColumn: (mixed) => mixed
};

const BlockListCRM = ({
  children,
  tasks,
  Component,
  className,
  index,
  allStatus,
  id,
  setSefColumn,
}: BlockListCRMProps) => {
  const setRefs = (value, provider) => {
    if (value) {
      setSefColumn(value);
    }
    provider(value);
  };

  return (
    // Здесь я приписал tasks[0].id так как вся консоль становилась красной и я не понял почему
    <Droppable type="CARDS" droppableId={id || tasks[0].id} index={index}>
      {(provider, snapshot) => (
        <div
          ref={(value) => {
            setRefs(value, provider.innerRef);
          }}
          {...provider.droppableProps}
          id={id}
          className={`block-list-crm custom-scrollbar column-4 ${className || ''}`}
          style={{
            backgroundColor: snapshot.isDraggingOver ? '#dcdee4' : '#EAEEF6',
          }}
        >
          {tasks.map((task, i) => (
            <Component
              allStatus={allStatus}
              key={(task && task.id) || i}
              index={i}
              {...task}
            />
          ))}
          {children}
          {provider.placeholder}
        </div>
      )}
    </Droppable>
  );
};

const DefExp = () => {};

export {
  BlockListCRM,
  DefExp,
};
