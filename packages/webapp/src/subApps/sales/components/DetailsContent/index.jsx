/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unused-state */
/* eslint-disable lines-between-class-members */
// @flow
import React from 'react';
import zenscroll from 'zenscroll';
import { ChatForm, DetailsListStyled } from '../index';
import { MessageComponent } from './styled';
import type { DealType, CommentType, DealTask } from '../../types';
import './style.scss';

const { Header } = DetailsListStyled;

type Props = {
  activeUser: DealType,
  setMessage: ({
    message: string,
    idx: string,
  }) => void,
  loading: boolean,
  comments: Array<CommentType>,
  deleteMessageCrm: ({
    id: number | string
  }) => void,
  updateMessage: ({
    id: number | string,
    content: string
  }) => {} | void,
  toggleModalNewDeal: (boolean, data?: DealTask) => void,
  isNewDeal: boolean,
  toggleNewTask: (boolean) => void
}

type State = {
  focus: boolean,
  message: string
}

class DetailsContent extends React.Component<Props, State> {
  messagesContainer: ?HTMLDivElement;
  inputRef: ?HTMLInputElement;
  scroll: any;

  constructor() {
    super();

    this.state = {
      focus: false,
      message: '',
    };

    this.inputRef = null;
    this.messagesContainer = null;
  }

  componentDidMount() {
    this.scroll = zenscroll.createScroller(this.messagesContainer);
    this.scrollSection();
  }

  changeInputText = (el: HTMLInputElement) => {
    this.inputRef = el;
  }

  scrollSection = () => {
    if (this.messagesContainer) {
      // $FlowFixMe
      this.scroll.toY(this.messagesContainer.scrollHeight);
    }
  }

  submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { setMessage, activeUser } = this.props;
    const { message } = this.state;
    if (message !== '') {
      this.scrollSection();
      setMessage({
        message,
        idx: activeUser.id,
        createdAt: new Date(),
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
      toggleModalNewDeal,
      isNewDeal,
      toggleNewTask,
    } = this.props;
    console.log(comments);
    const { message } = this.state;
    return (
      <div className="details-content">
        <Header className="header-content">
          <span>Log History</span>
        </Header>
        <section
          // $FlowFixMe
          ref={(div) => { this.messagesContainer = div; }}
          className="content-section"
          style={{
            height: this.inputRef ? `calc(100% - ${this.inputRef.style.height + 20}px)` : '100%',
          }}
        >
          <MessageComponent
            loading={loading}
            length={comments.length}
            toggleModalNewDeal={toggleModalNewDeal}
            toggleNewTask={toggleNewTask}
            activeUser={activeUser}
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
        >
          <ChatForm
            toggleNewTask={toggleNewTask}
            isNewDeal={isNewDeal}
            toggleModalNewDeal={toggleModalNewDeal}
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
