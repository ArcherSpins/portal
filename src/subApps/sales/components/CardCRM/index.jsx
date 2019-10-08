/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import './style.scss';

export type CardCRMProps = {
  title: string,
  client: string,
  manager: {
    id: string,
    name: string
  },
  index: number,
  id: string,
  allStatus: boolean,
}

const CardCRM = React.memo<CardCRMProps>((props: CardCRMProps) => {
  const {
    title,
    client,
    manager,
    index,
    id,
    allStatus,
  } = props;
  const linkTitle = title.replace(/\s/g, '_').replace('/', '&');
  return (
    <Draggable
      draggableId={id}
      index={index}
    >
      {
        (provider, shot) => (
          <Link
            to={`/crm/details/${linkTitle}`}
            className="container-crm-card"
          >
            <div
              {...provider.dragHandleProps}
              {...provider.draggableProps}
              ref={provider.innerRef}
            >
              <div
                id={id}
                className={`fz-14 card-crm drag-card ${id} ${shot.isDragging && 'rotate-animate'}`}
              >
                <h4 className="fz-14">{title}</h4>
                <div className="content mt-1 mb-2 d-flex drag-card">
                  <span className="fz-14 field-span drag-card mr-1">
                    {'Client: '}
                  </span>
                  <span className="fz-14 data-span drag-card">
                    {client || 'not client'}
                  </span>
                </div>
                {manager && allStatus
                  ? (
                    <div className="content mt-1 d-flex">
                      <span className="fz-14 field-span mr-1">
                        {'Manager: '}
                      </span>
                      <span className="fz-14 data-span">
                        {manager.name || 'not manager'}
                      </span>
                    </div>
                  )
                  : null}
              </div>
            </div>
          </Link>
        )
      }
    </Draggable>
  );
});

export {
  CardCRM,
};
