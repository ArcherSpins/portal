/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
// @flow
import React from 'react';
import { ChatForm, DetailsListStyled } from '../index';
import { MessageComponent } from './styled';
import type { DealType } from '../../types';
import './style.scss';

const { Header } = DetailsListStyled;

type Props = {
  activeUser: DealType,
  setMessage: ({
    message: string,
    idx: string,
  }) => void,
  loading: boolean,
  comments: [],
  deleteMessageCrm: ({
    id: number | string
  }) => void,
  updateMessage: ({
    id: number | string,
    content: string
  }) => {} | void,
}

type State = {
  focus: boolean,
  message: string
}

class DetailsContent extends React.Component<Props, State> {
  inputRef: ?HTMLInputElement;

  constructor() {
    super();

    this.state = {
      focus: false,
      message: '',
    };

    this.inputRef = null;
  }

  changeInputText = (el: HTMLInputElement) => {
    this.inputRef = el;
  }

  submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setMessage, activeUser } = this.props;
    const { message } = this.state;
    if (message !== '') {
      setMessage({
        message,
        idx: activeUser.id,
      });
      this.changeMessage('');
    }
  };

  funcFocus = (status: boolean) => {
    this.setState({ focus: status });
  }

  changeMessage = (value: string) => {
    this.setState({ message: value });
  }

  render() {
    const {
      activeUser,
      deleteMessageCrm,
      setMessage,
      loading,
      comments,
      updateMessage,
    } = this.props;

    const { message } = this.state;
    const inputHeight = this.inputRef ? Number(this.inputRef.style.height.replace('px', '')) : this.inputRef;
    return (
      <div className="details-content">
        <Header className="header-content">
          <span>Log History</span>
        </Header>
        <section
          className="content-section"
          style={{
            height: this.inputRef ? `calc(100% - ${this.inputRef.style.height + 20}px)` : '100%',
          }}
        >
          <MessageComponent
            loading={loading}
            length={comments.length}
            options={{
              data: comments,
              activeUser,
              deleteMessageCrm,
              updateMessage,
            }}
          />
        </section>
        <div
          className="chat-form-container"
          style={{
            height: this.inputRef ? `${inputHeight + 20}px` : '85px',
          }}
        >
          <ChatForm
            changeFocus={this.funcFocus}
            value={message}
            submitForm={this.submitForm}
            setMessage={setMessage}
            change={this.changeMessage}
            buttonDisabled={activeUser.id}
            changeInputText={this.changeInputText}
          />
        </div>
      </div>
    );
  }
}

const DefExp = () => {};

export {
  DetailsContent,
  DefExp,
};
