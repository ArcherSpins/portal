// TODO: FIX THIS
/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import { LoadingContainer } from '../../containers';
import { Message, TaskMessage } from '../index';
import type { DealType, CommentType } from '../../types';

export type MessageComponentProps = {
  loading: boolean,
  length: number,
  toggleModalNewDeal: () => void,
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
  }
}


// eslint-disable-next-line import/prefer-default-export
export const MessageComponent = ({
  loading, length, options, toggleModalNewDeal,
}: MessageComponentProps) => {
  const {
    data, activeUser, deleteMessageCrm, updateMessage,
  } = options;

  if (loading) {
    return <LoadingContainer style={{ paddingBottom: '100px' }} />;
  }

  return (
    <>
      {
        length > 0
          ? (
            <div className="block-messages">
              {data.map((message) => (
                <Message
                  activeUser={activeUser}
                  deleteMessageCrm={deleteMessageCrm}
                  key={message.id}
                  updateMessage={updateMessage}
                  {...message}
                />
              ))}
              <TaskMessage toggleModalNewDeal={toggleModalNewDeal} />
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
