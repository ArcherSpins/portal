/* eslint-disable react/no-unused-state */
// @flow
import React, { useState } from 'react';
import autosize from 'autosize';
import { format } from 'date-fns';
import { SkillsType } from '../../types';
import './style.scss';

type MessageProps = {
  content: string,
  id: string,
  // files,
  deleteMessageCrm: ({
    id: number | string
  }) => void,
  updateMessage: ({ id: string | number, content: string }) => void,
  user: {
    email: string,
    id: string,
    name: string,
    skills: Array<SkillsType>,
    status: string,
  },
  createdAt: string
}

const Message = ({
  // activeUser,
  content,
  id,
  // files,
  deleteMessageCrm,
  updateMessage,
  user,
  createdAt,
}: MessageProps) => {
  const [toggleText, toggleActiveText] = useState(false);
  const [textMessage, editText] = useState(content);

  const saveFunc = () => {
    updateMessage({ id, content: textMessage });
    toggleActiveText(false);
  };

  const getInputRef = (el) => {
    if (el) {
      autosize(el);
    }
  };

  const getDate = (data) => {
    try {
      const date = format(data, "dd MMM yyyy 'at' hh:mm");
      return date;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="message">
      <div className="container">
        <header>
          <h4>{user.name}</h4>
          <span>{getDate(new Date(createdAt))}</span>
        </header>
        <div className={`content ${toggleText ? '' : 'custom-scrollbar'}`}>
          {!toggleText ? (
            <p
              className="word-wrap"
              onDoubleClick={() => toggleActiveText(true)}
            >
              {content}
            </p>
          ) : (
            <textarea
              ref={getInputRef}
              onChange={(e) => editText(e.target.value)}
              className="textareaContent custom-scrollbar"
              value={textMessage}
            />
          )}
        </div>

        <div className="buttons d-flex align-items-center">
          {!toggleText ? (
            <button
              type="button"
              onClick={() => toggleActiveText(true)}
            >
              <svg
                className="icon"
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.43225 12.5001H0.25V9.31781L8.82625 0.741563C8.9669 0.600959 9.15763 0.521973 9.3565 0.521973C9.55537 0.521973 9.7461 0.600959 9.88675 0.741563L12.0085 2.86331C12.1491 3.00396 12.2281 3.19469 12.2281 3.39356C12.2281 3.59244 12.1491 3.78317 12.0085 3.92381L3.43225 12.5001ZM0.25 14.0001H13.75V15.5001H0.25V14.0001Z"
                  fill="#E7EAEF"
                />
              </svg>
            </button>
          ) : (
            <div>
              <button
                type="button"
                className="button-toggle-edit"
                onClick={() => toggleActiveText(false)}
              >
                close
              </button>
              <button
                type="button"
                className="button-toggle-edit"
                onClick={saveFunc}
              >
                save
              </button>
            </div>
          )}
          <button
            type="button"
            className="delete-button-message"
            onClick={() => deleteMessageCrm({ id })}
          >
            <svg
              className="icon"
              width="12"
              height="15"
              viewBox="0 0 12 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 0H4V2H0V4H12V2H8V0ZM1 5H11V13C11 14.1046 10.1046 15 9 15H3C1.89543 15 1 14.1046 1 13V5Z"
                fill="#E7EAEF"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const DefExp = () => {};

export {
  Message,
  DefExp,
};
