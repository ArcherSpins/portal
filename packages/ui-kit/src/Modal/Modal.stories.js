/* eslint-disable */
import React from 'react';
import { storiesOf, addDecorator } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styles from './Modal.module.scss';

import Input from '../Input';
import { Button } from '../Button';
import Modal from './Modal';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';

class ModalContainer extends React.Component<null, State> {
  constructor() {
    super();
    this.state = {
      isShowing: false,
      password: '',
      username: '',
    };
  }

  openModalHandler = () => {
    this.setState({
      isShowing: true,
    });
  };

  closeModalHandler = () => {
    this.setState({
      isShowing: false,
    });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ password: '', username: '', isShowing: false });
    action('Form Submitted');
  };

  render() {
    const { isShowing } = this.state;
    return (
      <div>
        <button
          onClick={this.openModalHandler}
          style={{ background: 'black', color: 'white' }}
        >
          Open Modal
        </button>
        <Modal
          className="modal"
          show={isShowing}
          onRequestClose={this.closeModalHandler}
        >
          <ModalHeader>
            <h1>Example Modal</h1>
          </ModalHeader>
          <ModalBody>
            <Input
              onChange={this.handleChange}
              name="username"
              type="text"
              value={this.state.username}
            />
            <Input
              onChange={this.handleChange}
              name="password"
              type="password"
              value={this.state.password}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" onClick={this.handleSubmit}>
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const withDecorator = node => () => <div>{node}</div>;

storiesOf('Modal', module).addWithChapters('Just Modal', {
  chapters: [
    {
      sections: [
        {
          title: 'Default',
          sectionFn: withDecorator(<ModalContainer />),
        },
      ],
    },
  ],
});
