// @flow
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'ui-kit';

import {
  Title,
  Message,
  CancelButton,
  SaveButton,
} from './styled';
import './style.scss';

type ModalProps = {
  onCancel: () => void,
  onDelete: () => void,
  isOpen: boolean
}

export default ({ onCancel, onDelete, isOpen }: ModalProps): React.Node => (
  <Modal
    className="modal"
    show={isOpen}
    onRequestClose={onCancel}
  >
    <ModalHeader>
      <Title>Delete Deal</Title>
    </ModalHeader>
    <ModalBody>
      <Message>Are you sure you want to delete?</Message>
    </ModalBody>
    <ModalFooter>
      <CancelButton onClick={onCancel}>Cancel</CancelButton>
      <SaveButton onClick={onDelete}>Delete</SaveButton>
    </ModalFooter>
  </Modal>
);
