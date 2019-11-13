// @flow

import React, { useState } from 'react';
import autosize from 'autosize';
import { Button, PopoverButton } from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';
import FilesComponent from './files';
import { Input } from './styled';
// $FlowFixMe
import fileIcon from '../Message/file.svg';
import './style.scss';

const createTestAttr = createTestContext('chat');

type ChatFormProps = {
  change: (string) => void,
  submitForm: (event?: SyntheticKeyboardEvent<HTMLFormElement>) => void,
  value: string,
  changeFocus: (boolean) => void,
  // buttonDisabled: null | boolean,
  changeInputText: (any) => void,
  toggleModalNewDeal: (boolean) => void,
  isNewDeal: boolean
}

const ChatForm = ({
  change,
  submitForm,
  value,
  changeFocus,
  changeInputText,
  toggleModalNewDeal,
  isNewDeal,
}: ChatFormProps) => {
  const [shift, func] = useState(false);
  const [isFiles, toggleFiles] = useState(false);

  const focusInput = (status) => {
    changeFocus(status);
  };

  const keyDownFunc = (e: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13 || e.keyCode === 17) e.preventDefault();
    if (e.keyCode === 17) {
      e.preventDefault();
      func(true);
    }
  };

  const keyUpFunc = (e: SyntheticKeyboardEvent<HTMLFormElement>) => {
    if (e.keyCode === 13) {
      if (!shift) {
        submitForm(e);
        return false;
      }
      // $FlowFixMe
      change(String(`${e.target.value}\n`));
    }
    if (e.keyCode === 17) {
      e.preventDefault();
      func(false);
    }

    return true;
  };

  const autosizeFunc = (el) => {
    if (el) {
      autosize(el);
      changeInputText(el);
    }
  };

  return (
    <form onSubmit={submitForm}>
      {
        isFiles && <FilesComponent files={[{ label: 'Fich', id: '1' }, { label: 'Fich', id: '2' }]} />
      }
      <div className="chat-form d-flex align-items-start">
        <div className="input-block">
          <Input
            ref={autosizeFunc}
            onKeyDown={keyDownFunc}
            onKeyUp={keyUpFunc}
            onFocus={() => focusInput(true)}
            onBlur={() => focusInput(false)}
            value={value}
            onChange={(e) => change(e.target.value)}
            placeholder="Add comment to this deal"
            style={{ width: `${(value.length + 1) * 10}px` }}
            data-test={createTestAttr('comment-input')}
          />
          <button
            type="button"
            data-test={createTestAttr('file-pin-button')}
            onClick={() => toggleFiles(!isFiles)}
          >
            <img src={fileIcon} alt="icon" />
          </button>
        </div>
        <div className="mr-10">
          <Button
            disabled={value === ''}
            type="submit"
            className="submit"
            data-test={createTestAttr('send-button')}
          >
            Send
          </Button>
        </div>
        <PopoverButton
          className="add-task"
          popover="Add Task"
          onClick={() => toggleModalNewDeal(true)}
          disabled={isNewDeal}
          data-test={createTestAttr('add-button')}
        />
      </div>
    </form>
  );
};

// eslint-disable-next-line import/prefer-default-export
export { ChatForm };
