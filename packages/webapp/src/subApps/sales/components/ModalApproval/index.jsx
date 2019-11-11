// @flow
import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@sfxdx/ui-kit';
import createTestContext from 'utils/createTestContext';

import {
  Title,
  Message,
  CancelButton,
  SaveButton,
} from './styled';

const createTestAttr = createTestContext('delete-deal');

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
      <CancelButton data-test={createTestAttr('cancel-button')} onClick={onCancel}>Cancel</CancelButton>
      <SaveButton data-test={createTestAttr('delete-button')} onClick={onDelete}>Delete</SaveButton>
    </ModalFooter>
  </Modal>
);
