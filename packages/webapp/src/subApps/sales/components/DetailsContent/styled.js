// TODO: FIX THIS
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import { LoadingContainer } from '../../containers';
import { Message, TaskMessage } from '../index';
import type { DealType, CommentType, DealTask } from '../../types';

export type MessageComponentProps = {
  loading: boolean,
  length: number,
  toggleModalNewDeal: (boolean, data?: DealTask) => void,
  options: {
    data: Array<CommentType>,
    activeUser: DealType,
    deleteMessageCrm: ({
      id: number | string
    }) => void,
    updateMessage: ({
      id: number | string,
    content: string
    }) => {} | void,
  },
  toggleNewTask: (boolean) => void
}


// eslint-disable-next-line import/prefer-default-export
export const MessageComponent = ({
  loading, length, options, toggleModalNewDeal, toggleNewTask,
}: MessageComponentProps) => {
  const {
    data, activeUser, deleteMessageCrm, updateMessage,
  } = options;

  if (loading) {
    return <LoadingContainer />;
  }

  return (
    <>
      {
        length > 0
          ? (
            <div className="block-messages">
              {data.map((message, i) => {
                /* eslint-disable no-underscore-dangle */
                if (message.__typename === 'DealTask') {
                  return (
                    <TaskMessage
                      onClick={(task) => {
                        toggleModalNewDeal(true, task);
                        toggleNewTask(false);
                      }}
                      lineRect={data[i - 1] && data[i - 1].__typename === 'DealComment'}
                      data={message}
                    />
                  );
                }

                return (
                  <Message
                    activeUser={activeUser}
                    deleteMessageCrm={deleteMessageCrm}
                    key={message.id}
                    updateMessage={updateMessage}
                    {...message}
                  />
                );
              })}
            </div>
          )
          : (
            <div className="not-found-container">
              <p>No comments were made in this deal</p>
            </div>
          )
      }
    </>
  );
};
