/* eslint-disable */
// @flow
import React from 'react';
import Modal from 'ui-kit/Modal';
import noop from 'lodash.noop';
import styles from './Modal.module.scss';

type State = {
  isShowing: boolean
}

class ModalContainer extends React.Component<null, State> {
  constructor() {
    super();
    this.state = {
      isShowing: false,
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

    render() {
      const { isShowing } = this.state;
      return (
        <div>
          <button onClick={this.openModalHandler} style={{background: 'black', color: 'white'}}>Open Modal</button>
          {isShowing ? (
            <div onClick={this.closeModalHandler} className={styles["back-drop"]} />
          ) : null}
          <Modal
            className="modal"
            show={isShowing}
            close={this.closeModalHandler}
            object="Task"
            func={noop}
          >
              Are you sure you want to delete?
          </Modal>
        </div>
      );
    }
}

export default ModalContainer;
