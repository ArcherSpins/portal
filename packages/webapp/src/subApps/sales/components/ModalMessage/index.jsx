// @flow

import React, { useState, useEffect } from 'react';
import { Modal, TextModal, ButtonCloseModal } from './styled';
import './style.scss';

type ModalProps = {
  message: string,
  statusError: boolean,
  animate: string,
  show: boolean,
  toggleModal: (boolean) => void
}

export default ({
  message, statusError, animate, show, toggleModal,
}: ModalProps) => {
  const [showModal, toggle] = useState(false);

  useEffect(() => {
    if (showModal !== show) {
      toggle(show);
    }
  });

  const clickClose = () => {
    toggleModal(false);
  };

  const className = statusError ? 'error-message-modal' : '';

  if (show) {
    return (
      <Modal className={`${className} animate-${animate} modal-message`}>
        <TextModal>{ message }</TextModal>
        <ButtonCloseModal onClick={clickClose}>x</ButtonCloseModal>
      </Modal>
    );
  }

  return null;
};
